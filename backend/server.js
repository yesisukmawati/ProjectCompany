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

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || !process.env.JWT_SECRET) {
    console.error("FATAL ERROR: Environment variables are not set in backend/.env");
    process.exit(1);
}

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

// --- ENDPOINT YANG DIPERBAIKI TOTAL ---
app.post('/api/documents/create-upload-url', authenticateToken, isAdmin, async (req, res) => {
    const { fileName } = req.body;
    if (!fileName) return res.status(400).json({ message: "File name is required." });
    try {
        // Menggunakan metode yang BENAR: createSignedUploadUrl
        const { data, error } = await supabase.storage.from('company-documents').createSignedUploadUrl(fileName);
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        console.error("Error in /create-upload-url:", err.message);
        res.status(500).json({ message: "Could not create upload URL.", error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});