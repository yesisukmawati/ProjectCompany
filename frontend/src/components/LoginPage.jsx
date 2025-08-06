// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
    const [nik, setNik] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Targetkan ke port 3000
            const response = await axios.post('http://localhost:3000/api/login', { nik, password });
            const { token, user } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/employee/dashboard');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal. Periksa kembali NIK dan Password Anda.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            <div className="hidden lg:flex w-1/2 bg-[#1A3A4A] text-white p-12 flex-col justify-between rounded-r-3xl">
                <div>PT. MERPATI WAHANA RAYA</div>
                <div>
                    <h1 className="text-4xl font-bold leading-tight mb-6">
                        <span className="bg-[#4299E1] px-2 text-[#1A3A4A] rounded">Selamat Datang!</span>
                        <br />
                        Silakan masuk untuk melanjutkan pekerjaan Anda.
                    </h1>
                    <img src="/orangkerja.png" alt="Team working" className="w-full max-w-lg mx-auto rounded-lg object-cover" />
                </div>
                <div></div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="flex justify-end mb-16">
                         <img src="/MWR.png" alt="MWR Logo" className="h-10" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                    <p className="text-gray-500 mb-8">Masukkan NIK dan Password Anda.</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="NIK (Nomor Induk Kependudukan)"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        
                        {error && <p className="text-sm text-red-500 text-center pt-2">{error}</p>}
                        
                        <div className="flex justify-end pt-4">
                             <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full px-8 py-3 bg-[#1A3A4A] text-white font-semibold rounded-lg hover:bg-[#2c5b77] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A3A4A] disabled:opacity-50 transition-colors"
                            >
                               {loading ? 'Memproses...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;