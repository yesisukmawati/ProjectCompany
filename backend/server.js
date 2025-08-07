// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Pemeriksaan Environment Variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || !process.env.JWT_SECRET) {
    console.error("❌ FATAL ERROR: Pastikan Anda sudah membuat file .env di dalam folder /backend dan mengisi semua variabel yang dibutuhkan.");
    process.exit(1);
}

// Inisialisasi Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// --- Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Akses ditolak. Hanya untuk admin." });
    }
    next();
};

// --- API Endpoints ---

// Endpoint Login
app.post('/api/login', async (req, res) => {
    const { nik, password } = req.body;
    if (!nik || !password) return res.status(400).json({ message: 'NIK dan password harus diisi.' });
    try {
        const { data: user, error } = await supabase.from('users').select('*').eq('nik', nik).single();
        if (error || !user) return res.status(404).json({ message: 'NIK tidak ditemukan.' });
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) return res.status(401).json({ message: 'Password salah.' });
        const token = jwt.sign({ id: user.id, nik: user.nik, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ message: 'Login berhasil!', token, user: { id: user.id, nik: user.nik, name: user.name, role: user.role } });
    } catch (err) { res.status(500).json({ message: 'Terjadi kesalahan pada server.' }); }
});

// Endpoint Tambah User
app.post('/api/users/add', authenticateToken, isAdmin, async (req, res) => {
    const { nik, name, password } = req.body;
    if (!nik || !name || !password) return res.status(400).json({ message: "Data tidak lengkap" });
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    try {
        await supabase.from('users').insert([{ nik, name, password_hash, role: 'employee' }]);
        res.status(201).json({ message: `User ${name} berhasil ditambahkan.` });
    } catch (error) { res.status(500).json({ message: "Gagal menambahkan user." }); }
});

// Endpoint GET Dokumen
app.get('/api/documents', authenticateToken, async (req, res) => {
    try {
        const { data, error } = await supabase.from('documents').select(`*, users(name)`).order('created_at', { ascending: false });
        if (error) throw error;
        const documentsWithUrls = data.map(doc => {
            const { data: { publicUrl } } = supabase.storage.from('company-documents').getPublicUrl(doc.file_path);
            return { ...doc, publicUrl };
        });
        res.status(200).json(documentsWithUrls);
    } catch (err) { res.status(500).json({ message: "Gagal mengambil data dokumen." }); }
});

// Endpoint Tambah Metadata Dokumen
app.post('/api/documents/add', authenticateToken, isAdmin, async (req, res) => {
    const { fileName, filePath, fileType, fileSize } = req.body;
    const uploaderId = req.user.id;
    try {
        await supabase.from('documents').insert([{ file_name: fileName, file_path: filePath, file_type: fileType, file_size: fileSize, uploaded_by_id: uploaderId }]);
        res.status(201).json({ message: "Dokumen berhasil di-upload." });
    } catch (err) { res.status(500).json({ message: "Gagal menyimpan metadata dokumen." }); }
});

// Endpoint Hapus Dokumen
app.delete('/api/documents/:docId', authenticateToken, isAdmin, async (req, res) => {
    const { docId } = req.params;
    try {
        const { data: doc, error: findError } = await supabase.from('documents').select('file_path').eq('id', docId).single();
        if (findError || !doc) return res.status(404).json({ message: "Dokumen tidak ditemukan." });
        
        await supabase.storage.from('company-documents').remove([doc.file_path]);
        await supabase.from('documents').delete().eq('id', docId);
        
        res.status(200).json({ message: `Dokumen berhasil dihapus.` });
    } catch (err) { res.status(500).json({ message: "Gagal menghapus dokumen." }); }
});

// Endpoint untuk membuat signed URL (untuk upload)
app.post('/api/documents/create-upload-url', authenticateToken, isAdmin, async (req, res) => {
    const { fileName } = req.body;
    if (!fileName) return res.status(400).json({ message: "Nama file dibutuhkan." });
    try {
        const { data, error } = await supabase.storage.from('company-documents').createSignedUrl(fileName, 60, { upsert: true }); // Menggunakan createSignedUrl yang lebih umum
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        console.error("Error di /create-upload-url:", err.message);
        res.status(500).json({ message: "Tidak dapat membuat URL upload.", error: err.message });
    }
});

// ===============================================
// API BARU UNTUK FITUR DASHBOARD & CUTI (DENGAN DATA CONTOH)
// ===============================================
app.get('/api/dashboard/stats', authenticateToken, (req, res) => res.json({ totalEmployee: 90, pendingAttendance: 5, leaveRequests: 3, onTimeToday: 78 }));
app.get('/api/leave-requests', authenticateToken, (req, res) => res.json([{ id: 1, name: 'Budi Santoso', department: 'IT', leave_type: 'Cuti Sakit', start_date: '2025-08-07', end_date: '2025-08-08', days: 2, status: 'Pending', document_count: 1 }, { id: 2, name: 'Siti Aminah', department: 'Finance', leave_type: 'Cuti Tahunan', start_date: '2025-08-11', end_date: '2025-08-12', days: 2, status: 'Approved', document_count: 0 }, { id: 3, name: 'Joko Widodo', department: 'Marketing', leave_type: 'Cuti Melahirkan', start_date: '2025-09-01', end_date: '2025-11-30', days: 90, status: 'Pending', document_count: 2 }]));
app.put('/api/leave-requests/:id', authenticateToken, isAdmin, (req, res) => { const { id } = req.params; const { status } = req.body; console.log(`Mengubah status cuti ID ${id} menjadi ${status}`); res.status(200).json({ message: `Status cuti berhasil diubah menjadi ${status}` }); });
app.get('/api/leave-requests/:requestId/documents', authenticateToken, (req, res) => { const { requestId } = req.params; console.log(`Mengambil dokumen untuk pengajuan cuti ID: ${requestId}`); res.json([{ id: 1, file_name: 'surat_dokter.pdf', file_url: '#' }, { id: 2, file_name: 'hasil_lab.jpg', file_url: '#' }]); });
app.get('/api/employee-quotas', authenticateToken, (req, res) => res.json([{ name: 'Budi Santoso', department: 'IT', total_quota: 12, used_quota: 5 }, { name: 'Siti Aminah', department: 'Finance', total_quota: 12, used_quota: 12 }, { name: 'Joko Widodo', department: 'Marketing', total_quota: 12, used_quota: 2 }]));
app.get('/api/analytics', authenticateToken, (req, res) => res.json({ leaveTypes: [{ leave_type: 'Cuti Tahunan', count: 45 }, { leave_type: 'Cuti Sakit', count: 20 }, { leave_type: 'Cuti Melahirkan', count: 5 }, { leave_type: 'Lainnya', count: 10 }], monthlyTrends: [{ month: 'Jan', count: 5 }, { month: 'Feb', count: 8 }, { month: 'Mar', count: 12 }, { month: 'Apr', count: 7 }, { month: 'May', count: 15 }, { month: 'Jun', count: 10 }] }));

// Endpoint Statistik Cuti (KHUSUS HALAMAN CUTI)
app.get('/api/cuti/stats', authenticateToken, (req, res) => {
    // Di aplikasi nyata, Anda akan menghitung ini dari database
    res.json({
        totalRequests: 80, // contoh
        pending: 3,        // contoh
        approved: 75,      // contoh
        avgProcessing: 2   // contoh
    });
});

// --- FUNGSI UNTUK MENJALANKAN SERVER ---
const startServer = async () => {
    try {
        // Tes koneksi ke Supabase dengan query sederhana
        console.log("Mencoba koneksi ke Supabase...");
        const { error } = await supabase.from('users').select('id').limit(1);

        if (error && error.message !== 'relation "public.users" does not exist') {
            // Abaikan error jika tabel 'users' belum ada, tapi tampilkan error koneksi lainnya
            throw new Error(error.message);
        }
        
        console.log("✅ Koneksi ke Supabase berhasil.");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`✅ Backend server berjalan di http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("---------------------------------------------------------");
        console.error("❌ GAGAL TERHUBUNG KE SUPABASE!");
        console.error("Pesan Error:", err.message);
        console.error("\nPastikan variabel SUPABASE_URL dan SUPABASE_SERVICE_KEY di file .env sudah benar.");
        console.error("---------------------------------------------------------");
        process.exit(1);
    }
};

// Jalankan server
startServer();