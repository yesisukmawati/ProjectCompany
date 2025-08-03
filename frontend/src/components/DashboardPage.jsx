import React, { useState, useEffect } from 'react';
import { FaBell, FaUserFriends, FaClipboardList, FaHeart, FaQuestionCircle, FaSearch, FaSync, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { format } from 'date-fns';

// --- DATA STATIS (MOCK DATA) ---
// Nanti data ini akan diambil dari API/backend

const mockUser = {
    name: 'Admin MWR',
    profilePic: 'https://i.ibb.co/wYpC8Hm/3d-avatar-1.png' // Ganti dengan path foto profil admin
};

const statsCardsData = [
    { title: 'Total Employee', value: 90, icon: <FaUserFriends />, color: 'bg-blue-400' },
    { title: 'Pending attendance', value: 90, icon: <FaClipboardList />, color: 'bg-pink-400' },
    { title: 'Cuti', value: 90, icon: <FaHeart />, color: 'bg-yellow-400' },
    { title: 'Jenis Cuti', value: 90, icon: <FaQuestionCircle />, color: 'bg-purple-400' },
];

const attendanceData = [
    { id: 1, name: 'Jane Cooper', username: '@jane', department: 'Finance', checkIn: '07:59 AM', status: 'On Time' },
    { id: 2, name: 'Esther Howard', username: '@esther', department: 'IT', checkIn: '08:20 AM', status: 'Late' },
    { id: 3, name: 'John Doe', username: '@john', department: 'Marketing', checkIn: null, status: 'Absent' },
    { id: 4, name: 'Robert Fox', username: '@robert', department: 'HR', checkIn: '07:45 AM', status: 'On Time' },
];

const genderData = [
    { name: 'Male', value: 54 }, // 60% dari 90
    { name: 'Female', value: 36 }, // 40% dari 90
];
const COLORS = ['#3B82F6', '#EC4899'];


// --- KOMPONEN-KOMPONEN KECIL ---

const Header = ({ user }) => (
    <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Good to see you again, {user.name.split(' ')[0]}!</h1>
            <p className="text-gray-500">Semoga harimu produktif dan lancar ☕</p>
        </div>
        <div className="flex items-center space-x-4">
            <button className="p-2 bg-white rounded-full shadow-md">
                <FaBell className="text-gray-600" />
            </button>
            <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
        </div>
    </div>
);

const StatCard = ({ item }) => (
    <div className={`p-6 rounded-2xl text-white shadow-lg flex items-center justify-between ${item.color}`}>
        <div>
            <p className="text-4xl font-bold">{item.value}</p>
            <p className="mt-1">{item.title}</p>
        </div>
        <div className="text-4xl opacity-70">{item.icon}</div>
    </div>
);

const Calendar = () => {
    const today = new Date();
    // Logika kalender yang lebih kompleks akan ditambahkan nanti
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">{format(today, 'MMMM yyyy')}</h3>
                {/* Tombol navigasi kalender */}
            </div>
            <div className="text-center text-gray-700">
                {/* Grid kalender akan ditampilkan di sini */}
                <p>Kalender akan muncul di sini.</p>
                <p className="font-bold text-blue-500 mt-4 text-5xl">{format(today, 'd')}</p>
                <p>{format(today, 'eeee')}</p>
            </div>
        </div>
    );
};

const AttendanceStatusTable = () => {
    const getStatusPill = (status) => {
        switch(status) {
            case 'On Time': return 'bg-green-100 text-green-700';
            case 'Late': return 'bg-yellow-100 text-yellow-700';
            case 'Absent': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
            <h3 className="text-xl font-bold text-gray-800">Attendance Status</h3>
            <p className="text-gray-500 mb-4">Overview of Daily Attendance Records</p>
            
            {/* Tombol Aksi */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-2">
                    <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><FaSync className="mr-2"/> Refresh</button>
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"><FaPlus className="mr-2"/> Add Attendance</button>
                </div>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-lg" />
                </div>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><FaFileExcel className="mr-2"/> Download Excel</button>
                    <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><FaFilePdf className="mr-2"/> Export to PDF</button>
                </div>
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-500">
                            <th className="py-2">Users</th>
                            <th className="py-2">Department</th>
                            <th className="py-2">Check In Time</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map(row => (
                            <tr key={row.id} className="border-t">
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-600 mr-3">
                                            {row.name.charAt(0)}{row.name.split(' ')[1].charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{row.name}</p>
                                            <p className="text-sm text-gray-500">{row.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">{row.department}</td>
                                <td className="py-4">{row.checkIn || '-'}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusPill(row.status)}`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- KOMPONEN UTAMA DASHBOARD ---

const DashboardPage = () => {
    const [user, setUser] = useState(mockUser);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Gabungkan data dari localStorage dengan foto profil dari mock data
            setUser(prevUser => ({ ...prevUser, name: parsedUser.name }));
        }
    }, []);

    return (
        <div>
            <Header user={user} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCardsData.map(item => <StatCard key={item.title} item={item} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Kolom Utama (Kiri & Tengah) */}
                <div className="lg:col-span-2">
                    <AttendanceStatusTable />
                </div>

                {/* Sidebar Kanan */}
                <div className="space-y-6">
                    <Calendar />
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="font-bold mb-2">Working Hours</h3>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>Working Hours MWR: 8:00 AM - 15:50 PM</p>
                            <p>Working Hours EDV: 8:00 AM - 15:50 PM</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="font-bold mb-2">Employee by Gender</h3>
                        <div style={{ width: '100%', height: 200 }}>
                             <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
