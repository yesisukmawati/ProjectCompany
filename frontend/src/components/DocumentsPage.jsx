import React, { useState, useEffect } from 'react';
import { FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFile, FaSearch, FaPlus, FaTrash, FaDownload, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
// Import createClient dari package yang sudah diinstall
import { createClient } from '@supabase/supabase-js';

// --- KONFIGURASI SUPABASE (UNTUK CLIENT-SIDE UPLOAD) ---
// Ambil variabel dari import.meta.env (cara Vite)
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// --- Helper Function ---
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

// --- Komponen Utama ---
const DocumentsPage = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3000/api/documents', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDocuments(response.data);
        } catch (err) {
            setError('Gagal memuat dokumen.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        setError('');
        try {
            // 1. Upload file ke Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('company-documents')
                .upload(file.name, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            // 2. Kirim metadata ke backend kita
            const token = localStorage.getItem('authToken');
            await axios.post('http://localhost:3000/api/documents/add', {
                fileName: file.name,
                filePath: uploadData.path,
                fileType: file.type,
                fileSize: file.size
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            fetchDocuments();

        } catch (err) {
            console.error(err);
            setError('Upload gagal. Pastikan nama file unik atau coba lagi.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleDelete = async (fileName) => {
        if (!window.confirm(`Apakah Anda yakin ingin menghapus ${fileName}?`)) return;

        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:3000/api/documents/${fileName}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchDocuments();
        } catch (err) {
            setError('Gagal menghapus dokumen.');
        } finally {
            setLoading(false);
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
                        <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
                            <FaPlus className="mr-2" /> New
                            <input type="file" className="hidden" onChange={handleUpload} />
                        </label>
                    )}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="pl-10 pr-4 py-2 border rounded-lg w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Konten Utama */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                
                <h2 className="text-xl font-bold text-gray-700 mb-4">All Files</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Owner</th>
                                <th className="py-2 px-4">Last Modified</th>
                                <th className="py-2 px-4">File Size</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocuments.map(doc => (
                                <tr key={doc.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 flex items-center">
                                        <span className="text-2xl mr-3">{getFileIcon(doc.file_type)}</span>
                                        {doc.file_name}
                                    </td>
                                    <td className="py-3 px-4">{doc.users?.name || 'System'}</td>
                                    <td className="py-3 px-4">{new Date(doc.created_at).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">{formatFileSize(doc.file_size)}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-4">
                                            <a href={doc.publicUrl} target="_blank" rel="noopener noreferrer" download>
                                                <FaDownload className="text-gray-600 hover:text-blue-500 cursor-pointer" />
                                            </a>
                                            {user?.role === 'admin' && (
                                                <FaTrash 
                                                    className="text-gray-600 hover:text-red-500 cursor-pointer" 
                                                    onClick={() => handleDelete(doc.file_name)}
                                                />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredDocuments.length === 0 && !loading && (
                        <p className="text-center py-8 text-gray-500">No documents found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentsPage;
