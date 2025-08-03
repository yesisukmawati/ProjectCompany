import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFile, FaSearch, FaPlus, FaTrash, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

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
            setError('Gagal memuat dokumen. Pastikan backend berjalan.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');

        const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9-._]/g, '')}`;

        try {
            const token = localStorage.getItem('authToken');

            // 1. Minta Signed URL dari backend
            const { data: uploadUrlData } = await axios.post(
                'http://localhost:3000/api/documents/create-upload-url',
                { fileName: uniqueFileName },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            
            // 2. Upload file menggunakan fetch API yang lebih andal
            const { createClient } = await import('@supabase/supabase-js');
            const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
            
            const { error: uploadError } = await supabase.storage
                .from('company-documents')
                .upload(uploadUrlData.path, file);

            if (uploadError) {
                throw new Error(uploadError.message);
            }

            // 3. Kirim metadata ke backend
            await axios.post('http://localhost:3000/api/documents/add', {
                fileName: file.name,
                filePath: uniqueFileName,
                fileType: file.type,
                fileSize: file.size
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            fetchDocuments();

        } catch (err) {
            console.error("Upload process failed:", err);
            setError('Upload gagal. Silakan coba lagi.');
        } finally {
            setUploading(false);
            event.target.value = null;
        }
    };
    
    const handleDelete = async (docId) => {
        if (!window.confirm(`Apakah Anda yakin ingin menghapus dokumen ini?`)) return;
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:3000/api/documents/${docId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchDocuments();
        } catch (err) {
            setError('Gagal menghapus dokumen.');
        }
    };

    const filteredDocuments = documents.filter(doc => 
        doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Document</h1>
                <div className="flex items-center space-x-4">
                    {user?.role === 'admin' && (
                        <label className={`flex items-center px-4 py-2 text-white rounded-lg cursor-pointer ${uploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}>
                            <FaPlus className="mr-2" /> 
                            {uploading ? 'Uploading...' : 'New'}
                            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
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

            <div className="bg-white p-6 rounded-2xl shadow-md">
                {error && <p className="text-center py-4 text-red-500">{error}</p>}
                
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
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-8">Loading documents...</td></tr>
                            ) : (
                                filteredDocuments.length > 0 ? filteredDocuments.map(doc => (
                                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 flex items-center">
                                            <span className="text-2xl mr-3">{getFileIcon(doc.file_type)}</span>
                                            <span className="truncate" style={{maxWidth: '300px'}} title={doc.file_name}>{doc.file_name}</span>
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
                                                        onClick={() => handleDelete(doc.id)}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">No documents found.</td></tr>
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
