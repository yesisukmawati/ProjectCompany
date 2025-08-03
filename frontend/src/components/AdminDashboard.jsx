// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    // State untuk data user yang sedang login
    const [adminUser, setAdminUser] = useState(null);

    // State untuk form tambah user baru
    const [nik, setNik] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // State untuk UI
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Ambil data user dari localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setAdminUser(JSON.parse(userData));
        } else {
            // Jika tidak ada data, tendang ke halaman login
            navigate('/login');
        }
    }, [navigate]);

    const handleAddUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError("Sesi Anda telah berakhir. Silakan login kembali.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3001/api/users/add',
                { nik, name, password, role: 'employee' },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setMessage(response.data.message);
            // Kosongkan form setelah berhasil
            setNik('');
            setName('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || "Gagal menambahkan user.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!adminUser) {
        return <div>Loading...</div>; // Atau tampilkan spinner
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center">
                         <span className="text-gray-600 mr-4">Welcome, {adminUser.name}!</span>
                         <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                         >
                            Logout
                         </button>
                    </div>
                </div>
            </header>

            {/* Konten Utama */}
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Tambah Karyawan Baru</h2>
                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div>
                                    <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                                    <input
                                        type="text"
                                        id="nik"
                                        value={nik}
                                        onChange={(e) => setNik(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password Sementara</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                
                                {message && <p className="text-sm text-green-600">{message}</p>}
                                {error && <p className="text-sm text-red-600">{error}</p>}

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                                    >
                                        {loading ? 'Menambahkan...' : 'Tambah User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
