// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
    // State untuk form input diubah ke NIK
    const [nik, setNik] = useState(''); 
    const [password, setPassword] = useState('');
    
    // State untuk UI
    const [selectedRole, setSelectedRole] = useState('Admin'); // Hanya untuk visual
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Kirim NIK dan password ke backend
        try {
            const response = await axios.post('http://localhost:3000/api/login', { nik, password });
            const { token, user } = response.data;

            // Simpan token dan data user di localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Arahkan berdasarkan role dari backend
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/employee/dashboard');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal. Periksa kembali data Anda.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Kolom Kiri (Informasi) */}
            <div className="hidden lg:flex w-1/2 bg-[#1A3A4A] text-white p-12 flex-col justify-between rounded-r-3xl">
                <div className="font-light">PT. MERPATI WAHANA RAYA</div>
                <div className="my-8">
                    <h1 className="text-4xl font-bold leading-tight">
                        <span className="bg-[#4299E1] px-2 text-[#1A3A4A] rounded">Welcome back!</span>
                        <br />
                        Please sign in to access your account and continue your work.
                    </h1>
                    <img src="/orangkerja.png" alt="Team working" className="w-full max-w-lg mx-auto mt-8 rounded-lg object-cover" />
                </div>
                <div></div>
            </div>

            {/* Kolom Kanan (Form Login) */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="flex justify-end mb-12">
                         <img src="/MWR.png" alt="MWR Logo" className="h-10" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">MWR Sign in!</h2>
                    <p className="text-gray-500 mb-8">Please enter your NIK and Password!</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Input NIK */}
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="NIK (Nomor Induk Kependudukan)"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Input Password */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        
                        {/* Pemilihan Role (Hanya Visual) */}
                        <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4">
                            <div 
                                className={`flex flex-col items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 w-36 h-40 justify-center ${selectedRole === 'Admin' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                onClick={() => setSelectedRole('Admin')}
                            >
                                <img src="/admin.png" alt="Admin" className="w-20 h-20 mb-2"/>
                                <span className="font-semibold text-gray-700">Admin</span>
                            </div>
                            <div 
                                className={`flex flex-col items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 w-36 h-40 justify-center ${selectedRole === 'Employee' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                onClick={() => setSelectedRole('Employee')}
                            >
                                <img src="/employee.png" alt="Employee" className="w-20 h-20 mb-2"/>
                                <span className="font-semibold text-gray-700">Employee</span>
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        
                        <div className="flex justify-end pt-4">
                             <button 
                                type="submit" 
                                disabled={loading}
                                className="px-8 py-3 bg-[#1A3A4A] text-white font-semibold rounded-lg hover:bg-[#2c5b77] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A3A4A] disabled:opacity-50"
                            >
                               {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
