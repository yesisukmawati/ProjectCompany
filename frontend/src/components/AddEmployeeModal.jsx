// src/components/AddEmployeeModal.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaUser, FaIdCard, FaLock } from 'react-icons/fa';

const AddEmployeeModal = ({ isOpen, onClose, onUserAdded }) => {
  // State untuk form tambah user baru
  const [nik, setNik] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // State untuk UI
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
        'http://localhost:3000/api/users/add',
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
      // Beri tahu komponen induk bahwa user baru telah ditambahkan
      if (onUserAdded) {
        onUserAdded();
      }
      // Tutup modal setelah beberapa saat
      setTimeout(() => {
        onClose();
        setMessage('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan user.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Karyawan Baru</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label htmlFor="nik" className="block text-sm font-medium text-gray-700 mb-1">NIK (Nomor Induk Kependudukan)</label>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="nik"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password Sementara</label>
             <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {message && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 mr-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
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
  );
};

export default AddEmployeeModal;