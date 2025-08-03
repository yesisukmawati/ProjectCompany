// mwr-backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// --- Middleware untuk verifikasi token dan role ---
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

// --- API Endpoints: Otentikasi & User Management (Sudah ada) ---
app.post('/api/login', async (req, res) => { /* ... kode login tidak berubah ... */ });
app.post('/api/users/add', authenticateToken, isAdmin, async (req, res) => { /* ... kode tambah user tidak berubah ... */ });

// --- API Endpoints BARU: Document Management ---

// 1. GET: Mendapatkan semua dokumen
app.get('/api/documents', authenticateToken, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('documents')
            .select(`
                id,
                file_name,
                file_type,
                file_size,
                created_at,
                users ( name ) 
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Buat URL publik untuk setiap file
        const documentsWithUrls = data.map(doc => {
            const { data: { publicUrl } } = supabase
                .storage
                .from('company-documents') // Nama bucket Anda
                .getPublicUrl(doc.file_name); // Kita gunakan file_name sebagai path unik
            return { ...doc, publicUrl };
        });

        res.status(200).json(documentsWithUrls);
    } catch (err) {
        console.error("Error fetching documents:", err);
        res.status(500).json({ message: "Gagal mengambil data dokumen." });
    }
});


// 2. POST: Menambahkan metadata dokumen (setelah upload di client)
app.post('/api/documents/add', authenticateToken, isAdmin, async (req, res) => {
    const { fileName, filePath, fileType, fileSize } = req.body;
    const uploaderId = req.user.id;

    if (!fileName || !filePath || !fileType || !fileSize) {
        return res.status(400).json({ message: "Data dokumen tidak lengkap." });
    }

    try {
        const { data, error } = await supabase
            .from('documents')
            .insert([{
                file_name: fileName,
                file_path: filePath,
                file_type: fileType,
                file_size: fileSize,
                uploaded_by_id: uploaderId
            }]);

        if (error) throw error;
        res.status(201).json({ message: "Dokumen berhasil di-upload." });

    } catch (err) {
        console.error("Error adding document metadata:", err);
        res.status(500).json({ message: "Gagal menyimpan metadata dokumen." });
    }
});


// 3. DELETE: Menghapus dokumen
app.delete('/api/documents/:fileName', authenticateToken, isAdmin, async (req, res) => {
    const { fileName } = req.params;

    try {
        // Hapus file dari Supabase Storage
        const { error: storageError } = await supabase
            .storage
            .from('company-documents')
            .remove([fileName]);
        
        if (storageError) {
             console.warn("Storage deletion warning:", storageError.message);
             // Kita tetap lanjutkan untuk menghapus metadata meskipun file di storage tidak ada
        }

        // Hapus metadata dari tabel database
        const { error: dbError } = await supabase
            .from('documents')
            .delete()
            .eq('file_name', fileName);

        if (dbError) throw dbError;

        res.status(200).json({ message: `Dokumen ${fileName} berhasil dihapus.` });

    } catch (err) {
        console.error("Error deleting document:", err);
        res.status(500).json({ message: "Gagal menghapus dokumen." });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
