// frontend/src/components/DocumentsPage.jsx

import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFile, FaSearch, FaPlus, FaTrash, FaDownload } from 'react-icons/fa';
import axios from 'axios';

// Helper Functions
const getFileIcon = (fileType) => {
    if (!fileType) return <FaFile className="text-gray-500" />;
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (fileType.includes('word')) return <FaFileWord className="text-blue-500" />;
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return <FaFileExcel className="text-green-500" />;
    if (fileType.includes('image')) return <FaFileImage className="text-purple-500" />;
    return <FaFile className="text-gray-500" />;
};

const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const DocumentsPage = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3000/api/documents', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDocuments(response.data);
        } catch (err) {
            setError('Gagal memuat dokumen. Pastikan backend berjalan dan Anda sudah login.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    // --- FUNGSI UPLOAD YANG SEPENUHNYA DIPERBAIKI ---
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');
        setSuccess('');

        const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9-._]/g, '')}`;
        const token = localStorage.getItem('authToken');

        try {
            // Langkah 1: Minta Signed URL dari backend Anda
            const signedUrlResponse = await axios.post(
                'http://localhost:3000/api/documents/create-upload-url',
                { fileName: uniqueFileName },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            const { path, signedUrl } = signedUrlResponse.data;

            if (!signedUrl) {
                throw new Error("Tidak berhasil mendapatkan Signed URL dari server.");
            }

            // Langkah 2: Upload file langsung ke Supabase Storage menggunakan Signed URL
            const uploadResponse = await fetch(signedUrl, {
                method: 'PUT',
                headers: { 'Content-Type': file.type },
                body: file,
            });

            if (!uploadResponse.ok) {
                const errorBody = await uploadResponse.text();
                throw new Error(`Gagal mengupload file ke storage: ${errorBody}`);
            }

            // Langkah 3: Jika upload berhasil, kirim metadata ke backend Anda
            await axios.post('http://localhost:3000/api/documents/add', {
                fileName: file.name, // simpan nama asli file
                filePath: path,      // simpan path unik di storage
                fileType: file.type,
                fileSize: file.size
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            setSuccess('Dokumen berhasil di-upload!');
            fetchDocuments(); // Muat ulang daftar dokumen

        } catch (err) {
            console.error("Proses upload gagal:", err);
            const errorMessage = err.response?.data?.message || err.message || 'Upload gagal. Silakan coba lagi.';
            setError(errorMessage);
        } finally {
            setUploading(false);
            // Reset input file agar bisa memilih file yang sama lagi
            event.target.value = null;
        }
    };
    
    const handleDelete = async (docId) => {
        if (!window.confirm(`Apakah Anda yakin ingin menghapus dokumen ini?`)) return;
        
        setError('');
        setSuccess('');
        
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:3000/api/documents/${docId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setSuccess('Dokumen berhasil dihapus.');
            fetchDocuments(); // Muat ulang daftar
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Gagal menghapus dokumen.';
            setError(errorMessage);
        }
    };

    const filteredDocuments = documents.filter(doc => 
        doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header Halaman */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Document</h1>
                <div className="flex items-center space-x-4">
                    {user?.role === 'admin' && (
                        <label className={`flex items-center px-4 py-2 text-white rounded-lg cursor-pointer transition-colors ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
                            <FaPlus className="mr-2" /> 
                            {uploading ? 'Uploading...' : 'Upload Baru'}
                            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                        </label>
                    )}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Cari dokumen..." 
                            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Notifikasi */}
            {error && <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</p>}
            {success && <p className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</p>}
            
            {/* Tabel Dokumen */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Semua File</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2 px-4">Nama</th>
                                <th className="py-2 px-4">Pemilik</th>
                                <th className="py-2 px-4">Tanggal Upload</th>
                                <th className="py-2 px-4">Ukuran File</th>
                                <th className="py-2 px-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-8 text-gray-500">Memuat dokumen...</td></tr>
                            ) : (
                                filteredDocuments.length > 0 ? filteredDocuments.map(doc => (
                                    <tr key={doc.id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 flex items-center">
                                            <span className="text-2xl mr-3">{getFileIcon(doc.file_type)}</span>
                                            <span className="font-medium text-gray-800 truncate" style={{maxWidth: '300px'}} title={doc.file_name}>{doc.file_name}</span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{doc.users?.name || 'N/A'}</td>
                                        <td className="py-3 px-4 text-gray-600">{new Date(doc.created_at).toLocaleDateString('id-ID')}</td>
                                        <td className="py-3 px-4 text-gray-600">{formatFileSize(doc.file_size)}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center space-x-4">
                                                <a href={doc.publicUrl} target="_blank" rel="noopener noreferrer" download title="Download">
                                                    <FaDownload className="text-gray-600 hover:text-blue-500 cursor-pointer" />
                                                </a>
                                                {user?.role === 'admin' && (
                                                    <button onClick={() => handleDelete(doc.id)} title="Hapus">
                                                        <FaTrash className="text-gray-600 hover:text-red-500 cursor-pointer" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">Tidak ada dokumen yang ditemukan.</td></tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DocumentsPage;