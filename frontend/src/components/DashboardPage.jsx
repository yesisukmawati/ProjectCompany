// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { FaBell, FaUserFriends, FaClipboardList, FaHeart, FaQuestionCircle, FaSearch, FaSync, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
// // // // // // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// // // // // // import { format } from 'date-fns';

// // // // // // // --- DATA STATIS (MOCK DATA) ---
// // // // // // // Nanti data ini akan diambil dari API/backend

// // // // // // const mockUser = {
// // // // // //     name: 'Admin MWR',
// // // // // //     profilePic: 'https://i.ibb.co/wYpC8Hm/3d-avatar-1.png' // Ganti dengan path foto profil admin
// // // // // // };

// // // // // // const statsCardsData = [
// // // // // //     { title: 'Total Employee', value: 90, icon: <FaUserFriends />, color: 'bg-blue-400' },
// // // // // //     { title: 'Pending attendance', value: 90, icon: <FaClipboardList />, color: 'bg-pink-400' },
// // // // // //     { title: 'Cuti', value: 90, icon: <FaHeart />, color: 'bg-yellow-400' },
// // // // // //     { title: 'Jenis Cuti', value: 90, icon: <FaQuestionCircle />, color: 'bg-purple-400' },
// // // // // // ];

// // // // // // const attendanceData = [
// // // // // //     { id: 1, name: 'Jane Cooper', username: '@jane', department: 'Finance', checkIn: '07:59 AM', status: 'On Time' },
// // // // // //     { id: 2, name: 'Esther Howard', username: '@esther', department: 'IT', checkIn: '08:20 AM', status: 'Late' },
// // // // // //     { id: 3, name: 'John Doe', username: '@john', department: 'Marketing', checkIn: null, status: 'Absent' },
// // // // // //     { id: 4, name: 'Robert Fox', username: '@robert', department: 'HR', checkIn: '07:45 AM', status: 'On Time' },
// // // // // // ];

// // // // // // const genderData = [
// // // // // //     { name: 'Male', value: 54 }, // 60% dari 90
// // // // // //     { name: 'Female', value: 36 }, // 40% dari 90
// // // // // // ];
// // // // // // const COLORS = ['#3B82F6', '#EC4899'];


// // // // // // // --- KOMPONEN-KOMPONEN KECIL ---

// // // // // // const Header = ({ user }) => (
// // // // // //     <div className="flex justify-between items-center mb-8">
// // // // // //         <div>
// // // // // //             <h1 className="text-3xl font-bold text-gray-800">Good to see you again, {user.name.split(' ')[0]}!</h1>
// // // // // //             <p className="text-gray-500">Semoga harimu produktif dan lancar ☕</p>
// // // // // //         </div>
// // // // // //         <div className="flex items-center space-x-4">
// // // // // //             <button className="p-2 bg-white rounded-full shadow-md">
// // // // // //                 <FaBell className="text-gray-600" />
// // // // // //             </button>
// // // // // //             <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
// // // // // //         </div>
// // // // // //     </div>
// // // // // // );

// // // // // // const StatCard = ({ item }) => (
// // // // // //     <div className={`p-6 rounded-2xl text-white shadow-lg flex items-center justify-between ${item.color}`}>
// // // // // //         <div>
// // // // // //             <p className="text-4xl font-bold">{item.value}</p>
// // // // // //             <p className="mt-1">{item.title}</p>
// // // // // //         </div>
// // // // // //         <div className="text-4xl opacity-70">{item.icon}</div>
// // // // // //     </div>
// // // // // // );

// // // // // // const Calendar = () => {
// // // // // //     const today = new Date();
// // // // // //     // Logika kalender yang lebih kompleks akan ditambahkan nanti
// // // // // //     return (
// // // // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // // //             <div className="flex justify-between items-center mb-4">
// // // // // //                 <h3 className="font-bold">{format(today, 'MMMM yyyy')}</h3>
// // // // // //                 {/* Tombol navigasi kalender */}
// // // // // //             </div>
// // // // // //             <div className="text-center text-gray-700">
// // // // // //                 {/* Grid kalender akan ditampilkan di sini */}
// // // // // //                 <p>Kalender akan muncul di sini.</p>
// // // // // //                 <p className="font-bold text-blue-500 mt-4 text-5xl">{format(today, 'd')}</p>
// // // // // //                 <p>{format(today, 'eeee')}</p>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // const AttendanceStatusTable = () => {
// // // // // //     const getStatusPill = (status) => {
// // // // // //         switch(status) {
// // // // // //             case 'On Time': return 'bg-green-100 text-green-700';
// // // // // //             case 'Late': return 'bg-yellow-100 text-yellow-700';
// // // // // //             case 'Absent': return 'bg-red-100 text-red-700';
// // // // // //             default: return 'bg-gray-100 text-gray-700';
// // // // // //         }
// // // // // //     }

// // // // // //     return (
// // // // // //         <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
// // // // // //             <h3 className="text-xl font-bold text-gray-800">Attendance Status</h3>
// // // // // //             <p className="text-gray-500 mb-4">Overview of Daily Attendance Records</p>
            
// // // // // //             {/* Tombol Aksi */}
// // // // // //             <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
// // // // // //                 <div className="flex items-center space-x-2">
// // // // // //                     <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><FaSync className="mr-2"/> Refresh</button>
// // // // // //                     <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"><FaPlus className="mr-2"/> Add Attendance</button>
// // // // // //                 </div>
// // // // // //                 <div className="relative">
// // // // // //                     <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // // //                     <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-lg" />
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center space-x-2">
// // // // // //                     <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><FaFileExcel className="mr-2"/> Download Excel</button>
// // // // // //                     <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><FaFilePdf className="mr-2"/> Export to PDF</button>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* Tabel */}
// // // // // //             <div className="overflow-x-auto">
// // // // // //                 <table className="w-full text-left">
// // // // // //                     <thead>
// // // // // //                         <tr className="text-gray-500">
// // // // // //                             <th className="py-2">Users</th>
// // // // // //                             <th className="py-2">Department</th>
// // // // // //                             <th className="py-2">Check In Time</th>
// // // // // //                             <th className="py-2">Status</th>
// // // // // //                         </tr>
// // // // // //                     </thead>
// // // // // //                     <tbody>
// // // // // //                         {attendanceData.map(row => (
// // // // // //                             <tr key={row.id} className="border-t">
// // // // // //                                 <td className="py-4">
// // // // // //                                     <div className="flex items-center">
// // // // // //                                         <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-600 mr-3">
// // // // // //                                             {row.name.charAt(0)}{row.name.split(' ')[1].charAt(0)}
// // // // // //                                         </div>
// // // // // //                                         <div>
// // // // // //                                             <p className="font-semibold">{row.name}</p>
// // // // // //                                             <p className="text-sm text-gray-500">{row.username}</p>
// // // // // //                                         </div>
// // // // // //                                     </div>
// // // // // //                                 </td>
// // // // // //                                 <td className="py-4">{row.department}</td>
// // // // // //                                 <td className="py-4">{row.checkIn || '-'}</td>
// // // // // //                                 <td className="py-4">
// // // // // //                                     <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusPill(row.status)}`}>
// // // // // //                                         {row.status}
// // // // // //                                     </span>
// // // // // //                                 </td>
// // // // // //                             </tr>
// // // // // //                         ))}
// // // // // //                     </tbody>
// // // // // //                 </table>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };


// // // // // // // --- KOMPONEN UTAMA DASHBOARD ---

// // // // // // const DashboardPage = () => {
// // // // // //     const [user, setUser] = useState(mockUser);

// // // // // //     useEffect(() => {
// // // // // //         const storedUser = localStorage.getItem('user');
// // // // // //         if (storedUser) {
// // // // // //             const parsedUser = JSON.parse(storedUser);
// // // // // //             // Gabungkan data dari localStorage dengan foto profil dari mock data
// // // // // //             setUser(prevUser => ({ ...prevUser, name: parsedUser.name }));
// // // // // //         }
// // // // // //     }, []);

// // // // // //     return (
// // // // // //         <div>
// // // // // //             <Header user={user} />
            
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // //                 {statsCardsData.map(item => <StatCard key={item.title} item={item} />)}
// // // // // //             </div>

// // // // // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
// // // // // //                 {/* Kolom Utama (Kiri & Tengah) */}
// // // // // //                 <div className="lg:col-span-2">
// // // // // //                     <AttendanceStatusTable />
// // // // // //                 </div>

// // // // // //                 {/* Sidebar Kanan */}
// // // // // //                 <div className="space-y-6">
// // // // // //                     <Calendar />
// // // // // //                     <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // // //                         <h3 className="font-bold mb-2">Working Hours</h3>
// // // // // //                         <div className="text-sm text-gray-600 space-y-2">
// // // // // //                             <p>Working Hours MWR: 8:00 AM - 15:50 PM</p>
// // // // // //                             <p>Working Hours EDV: 8:00 AM - 15:50 PM</p>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                     <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // // //                         <h3 className="font-bold mb-2">Employee by Gender</h3>
// // // // // //                         <div style={{ width: '100%', height: 200 }}>
// // // // // //                              <ResponsiveContainer>
// // // // // //                                 <PieChart>
// // // // // //                                     <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
// // // // // //                                         {genderData.map((entry, index) => (
// // // // // //                                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// // // // // //                                         ))}
// // // // // //                                     </Pie>
// // // // // //                                     <Tooltip />
// // // // // //                                 </PieChart>
// // // // // //                             </ResponsiveContainer>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default DashboardPage;

// // // // // // src/components/DashboardPage.jsx

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { FaBell, FaUserFriends, FaClipboardList, FaHeart, FaQuestionCircle, FaSearch, FaSync, FaPlus, FaFileExcel, FaFilePdf, FaUserPlus } from 'react-icons/fa';
// // // // // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// // // // // import { format } from 'date-fns';
// // // // // import AddEmployeeModal from './AddEmployeeModal'; // <-- IMPORT MODAL BARU

// // // // // // --- DATA STATIS (MOCK DATA) ---
// // // // // const mockUser = {
// // // // //     name: 'Admin MWR',
// // // // //     profilePic: 'https://i.ibb.co/wYpC8Hm/3d-avatar-1.png'
// // // // // };

// // // // // const statsCardsData = [
// // // // //     { title: 'Total Employee', value: 90, icon: <FaUserFriends />, color: 'bg-blue-400' },
// // // // //     { title: 'Pending attendance', value: 90, icon: <FaClipboardList />, color: 'bg-pink-400' },
// // // // //     { title: 'Cuti', value: 90, icon: <FaHeart />, color: 'bg-yellow-400' },
// // // // //     { title: 'Jenis Cuti', value: 90, icon: <FaQuestionCircle />, color: 'bg-purple-400' },
// // // // // ];

// // // // // const attendanceData = [
// // // // //     { id: 1, name: 'Jane Cooper', username: '@jane', department: 'Finance', checkIn: '07:59 AM', status: 'On Time' },
// // // // //     { id: 2, name: 'Esther Howard', username: '@esther', department: 'IT', checkIn: '08:20 AM', status: 'Late' },
// // // // //     { id: 3, name: 'John Doe', username: '@john', department: 'Marketing', checkIn: null, status: 'Absent' },
// // // // //     { id: 4, name: 'Robert Fox', username: '@robert', department: 'HR', checkIn: '07:45 AM', status: 'On Time' },
// // // // // ];

// // // // // const genderData = [
// // // // //     { name: 'Male', value: 54 },
// // // // //     { name: 'Female', value: 36 },
// // // // // ];
// // // // // const COLORS = ['#3B82F6', '#EC4899'];

// // // // // // --- KOMPONEN-KOMPONEN KECIL ---
// // // // // const Header = ({ user }) => (
// // // // //     <div className="flex justify-between items-center mb-8">
// // // // //         <div>
// // // // //             <h1 className="text-3xl font-bold text-gray-800">Good to see you again, {user.name ? user.name.split(' ')[0] : ''}!</h1>
// // // // //             <p className="text-gray-500">Semoga harimu produktif dan lancar ☕</p>
// // // // //         </div>
// // // // //         <div className="flex items-center space-x-4">
// // // // //             <button className="p-2 bg-white rounded-full shadow-md">
// // // // //                 <FaBell className="text-gray-600" />
// // // // //             </button>
// // // // //             <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
// // // // //         </div>
// // // // //     </div>
// // // // // );

// // // // // const StatCard = ({ item }) => (
// // // // //     <div className={`p-6 rounded-2xl text-white shadow-lg flex items-center justify-between ${item.color}`}>
// // // // //         <div>
// // // // //             <p className="text-4xl font-bold">{item.value}</p>
// // // // //             <p className="mt-1">{item.title}</p>
// // // // //         </div>
// // // // //         <div className="text-4xl opacity-70">{item.icon}</div>
// // // // //     </div>
// // // // // );

// // // // // const Calendar = () => {
// // // // //     const today = new Date();
// // // // //     return (
// // // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // //             <div className="flex justify-between items-center mb-4">
// // // // //                 <h3 className="font-bold">{format(today, 'MMMM yyyy')}</h3>
// // // // //             </div>
// // // // //             <div className="text-center text-gray-700">
// // // // //                 <p>Kalender akan muncul di sini.</p>
// // // // //                 <p className="font-bold text-blue-500 mt-4 text-5xl">{format(today, 'd')}</p>
// // // // //                 <p>{format(today, 'eeee')}</p>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // // --- KOMPONEN UTAMA DASHBOARD ---
// // // // // const DashboardPage = () => {
// // // // //     const [user, setUser] = useState(mockUser);
// // // // //     const [isModalOpen, setIsModalOpen] = useState(false); // <-- STATE UNTUK MODAL

// // // // //     useEffect(() => {
// // // // //         const storedUser = localStorage.getItem('user');
// // // // //         if (storedUser) {
// // // // //             const parsedUser = JSON.parse(storedUser);
// // // // //             setUser(prevUser => ({ ...prevUser, name: parsedUser.name }));
// // // // //         }
// // // // //     }, []);

// // // // //     const handleUserAdded = () => {
// // // // //         // Logika tambahan jika diperlukan setelah user ditambahkan,
// // // // //         // misalnya refresh data total employee
// // // // //         console.log("A new user has been added!");
// // // // //     };

// // // // //     const getStatusPill = (status) => {
// // // // //         switch(status) {
// // // // //             case 'On Time': return 'bg-green-100 text-green-700';
// // // // //             case 'Late': return 'bg-yellow-100 text-yellow-700';
// // // // //             case 'Absent': return 'bg-red-100 text-red-700';
// // // // //             default: return 'bg-gray-100 text-gray-700';
// // // // //         }
// // // // //     }

// // // // //     return (
// // // // //         <div>
// // // // //             <Header user={user} />
            
// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                 {statsCardsData.map(item => <StatCard key={item.title} item={item} />)}
// // // // //             </div>

// // // // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
// // // // //                 <div className="lg:col-span-2">
// // // // //                     {/* TABEL ATTENDANCE */}
// // // // //                     <div className="bg-white p-6 rounded-2xl shadow-md">
// // // // //                         <h3 className="text-xl font-bold text-gray-800">Attendance Status</h3>
// // // // //                         <p className="text-gray-500 mb-4">Overview of Daily Attendance Records</p>
                        
// // // // //                         <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
// // // // //                             <div className="flex items-center space-x-2">
// // // // //                                 <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><FaSync className="mr-2"/> Refresh</button>
                                
// // // // //                                 {/* TOMBOL DIUBAH UNTUK MEMBUKA MODAL */}
// // // // //                                 <button 
// // // // //                                     onClick={() => setIsModalOpen(true)}
// // // // //                                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
// // // // //                                     <FaUserPlus className="mr-2"/> Add Employee
// // // // //                                 </button>
// // // // //                             </div>
// // // // //                             <div className="relative">
// // // // //                                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // //                                 <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-lg" />
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <div className="overflow-x-auto">
// // // // //                             <table className="w-full text-left">
// // // // //                                 <thead>
// // // // //                                     <tr className="text-gray-500">
// // // // //                                         <th className="py-2">Users</th>
// // // // //                                         <th className="py-2">Department</th>
// // // // //                                         <th className="py-2">Check In Time</th>
// // // // //                                         <th className="py-2">Status</th>
// // // // //                                     </tr>
// // // // //                                 </thead>
// // // // //                                 <tbody>
// // // // //                                     {attendanceData.map(row => (
// // // // //                                         <tr key={row.id} className="border-t">
// // // // //                                             <td className="py-4">
// // // // //                                                 <div className="flex items-center">
// // // // //                                                     <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-600 mr-3">
// // // // //                                                         {row.name.charAt(0)}{row.name.split(' ')[1] ? row.name.split(' ')[1].charAt(0) : ''}
// // // // //                                                     </div>
// // // // //                                                     <div>
// // // // //                                                         <p className="font-semibold">{row.name}</p>
// // // // //                                                         <p className="text-sm text-gray-500">{row.username}</p>
// // // // //                                                     </div>
// // // // //                                                 </div>
// // // // //                                             </td>
// // // // //                                             <td className="py-4">{row.department}</td>
// // // // //                                             <td className="py-4">{row.checkIn || '-'}</td>
// // // // //                                             <td className="py-4">
// // // // //                                                 <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusPill(row.status)}`}>
// // // // //                                                     {row.status}
// // // // //                                                 </span>
// // // // //                                             </td>
// // // // //                                         </tr>
// // // // //                                     ))}
// // // // //                                 </tbody>
// // // // //                             </table>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 {/* Sidebar Kanan */}
// // // // //                 <div className="space-y-6">
// // // // //                     <Calendar />
// // // // //                     <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // //                         <h3 className="font-bold mb-2">Working Hours</h3>
// // // // //                         <div className="text-sm text-gray-600 space-y-2">
// // // // //                             <p>Working Hours MWR: 8:00 AM - 15:50 PM</p>
// // // // //                             <p>Working Hours EDV: 8:00 AM - 15:50 PM</p>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // //                         <h3 className="font-bold mb-2">Employee by Gender</h3>
// // // // //                         <div style={{ width: '100%', height: 200 }}>
// // // // //                              <ResponsiveContainer>
// // // // //                                 <PieChart>
// // // // //                                     <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
// // // // //                                         {genderData.map((entry, index) => (
// // // // //                                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// // // // //                                         ))}
// // // // //                                     </Pie>
// // // // //                                     <Tooltip />
// // // // //                                 </PieChart>
// // // // //                             </ResponsiveContainer>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* RENDER MODAL DI SINI */}
// // // // //             <AddEmployeeModal 
// // // // //                 isOpen={isModalOpen} 
// // // // //                 onClose={() => setIsModalOpen(false)}
// // // // //                 onUserAdded={handleUserAdded}
// // // // //             />
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default DashboardPage;

// // // // // src/components/DashboardPage.jsx

// // // // import React, { useState, useEffect } from 'react';
// // // // import { FaBell, FaUserFriends, FaClipboardList, FaHeart, FaQuestionCircle, FaSearch, FaSync, FaPlus, FaFileExcel, FaFilePdf, FaUserPlus } from 'react-icons/fa';
// // // // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// // // // import { format } from 'date-fns';
// // // // import AddEmployeeModal from './AddEmployeeModal';

// // // // // Impor library untuk ekspor
// // // // import * as XLSX from 'xlsx';
// // // // import { saveAs } from 'file-saver';
// // // // import jsPDF from 'jspdf';
// // // // import 'jspdf-autotable';


// // // // // --- DATA STATIS (MOCK DATA) ---
// // // // const mockUser = {
// // // //     name: 'Admin MWR',
// // // //     profilePic: 'https://i.ibb.co/wYpC8Hm/3d-avatar-1.png'
// // // // };

// // // // const statsCardsData = [
// // // //     { title: 'Total Employee', value: 90, icon: <FaUserFriends />, color: 'bg-blue-400' },
// // // //     { title: 'Pending attendance', value: 90, icon: <FaClipboardList />, color: 'bg-pink-400' },
// // // //     { title: 'Cuti', value: 90, icon: <FaHeart />, color: 'bg-yellow-400' },
// // // //     { title: 'Jenis Cuti', value: 90, icon: <FaQuestionCircle />, color: 'bg-purple-400' },
// // // // ];

// // // // const attendanceData = [
// // // //     { id: 1, name: 'Jane Cooper', username: '@jane', department: 'Finance', checkIn: '07:59 AM', status: 'On Time' },
// // // //     { id: 2, name: 'Esther Howard', username: '@esther', department: 'IT', checkIn: '08:20 AM', status: 'Late' },
// // // //     { id: 3, name: 'John Doe', username: '@john', department: 'Marketing', checkIn: null, status: 'Absent' },
// // // //     { id: 4, name: 'Robert Fox', username: '@robert', department: 'HR', checkIn: '07:45 AM', status: 'On Time' },
// // // // ];

// // // // const genderData = [
// // // //     { name: 'Male', value: 54 },
// // // //     { name: 'Female', value: 36 },
// // // // ];
// // // // const COLORS = ['#3B82F6', '#EC4899'];

// // // // // --- KOMPONEN-KOMPONEN KECIL ---
// // // // const Header = ({ user }) => (
// // // //     <div className="flex justify-between items-center mb-8">
// // // //         <div>
// // // //             <h1 className="text-3xl font-bold text-gray-800">Good to see you again, {user.name ? user.name.split(' ')[0] : ''}!</h1>
// // // //             <p className="text-gray-500">Semoga harimu produktif dan lancar ☕</p>
// // // //         </div>
// // // //         <div className="flex items-center space-x-4">
// // // //             <button className="p-2 bg-white rounded-full shadow-md">
// // // //                 <FaBell className="text-gray-600" />
// // // //             </button>
// // // //             <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
// // // //         </div>
// // // //     </div>
// // // // );

// // // // const StatCard = ({ item }) => (
// // // //     <div className={`p-6 rounded-2xl text-white shadow-lg flex items-center justify-between ${item.color}`}>
// // // //         <div>
// // // //             <p className="text-4xl font-bold">{item.value}</p>
// // // //             <p className="mt-1">{item.title}</p>
// // // //         </div>
// // // //         <div className="text-4xl opacity-70">{item.icon}</div>
// // // //     </div>
// // // // );

// // // // const Calendar = () => {
// // // //     const today = new Date();
// // // //     return (
// // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // //             <div className="flex justify-between items-center mb-4">
// // // //                 <h3 className="font-bold">{format(today, 'MMMM yyyy')}</h3>
// // // //             </div>
// // // //             <div className="text-center text-gray-700">
// // // //                 <p>Kalender akan muncul di sini.</p>
// // // //                 <p className="font-bold text-blue-500 mt-4 text-5xl">{format(today, 'd')}</p>
// // // //                 <p>{format(today, 'eeee')}</p>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // // --- KOMPONEN UTAMA DASHBOARD ---
// // // // const DashboardPage = () => {
// // // //     const [user, setUser] = useState(mockUser);
// // // //     const [isModalOpen, setIsModalOpen] = useState(false);

// // // //     useEffect(() => {
// // // //         const storedUser = localStorage.getItem('user');
// // // //         if (storedUser) {
// // // //             const parsedUser = JSON.parse(storedUser);
// // // //             setUser(prevUser => ({ ...prevUser, name: parsedUser.name }));
// // // //         }
// // // //     }, []);

// // // //     const handleUserAdded = () => {
// // // //         console.log("A new user has been added!");
// // // //     };

// // // //     // --- FUNGSI UNTUK DOWNLOAD EXCEL ---
// // // //     const handleDownloadExcel = () => {
// // // //         // Siapkan data untuk worksheet, hapus properti yang tidak perlu
// // // //         const dataToExport = attendanceData.map(({ id, username, ...rest }) => rest);
        
// // // //         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
// // // //         const workbook = XLSX.utils.book_new();
// // // //         XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

// // // //         // Atur lebar kolom agar lebih rapi
// // // //         const colWidths = [
// // // //             { wch: 20 }, // Name
// // // //             { wch: 15 }, // Department
// // // //             { wch: 15 }, // Check In Time
// // // //             { wch: 15 }, // Status
// // // //         ];
// // // //         worksheet["!cols"] = colWidths;

// // // //         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
// // // //         const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        
// // // //         saveAs(data, `Attendance_Report_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
// // // //     };

// // // //     // --- FUNGSI UNTUK EKSPOR PDF ---
// // // //     const handleExportPdf = () => {
// // // //         const doc = new jsPDF();
        
// // // //         doc.setFontSize(18);
// // // //         doc.text("Laporan Absensi Karyawan", 14, 22);
// // // //         doc.setFontSize(11);
// // // //         doc.setTextColor(100);
// // // //         doc.text(`Tanggal: ${format(new Date(), 'dd MMMM yyyy')}`, 14, 30);

// // // //         // Definisikan header dan body untuk autoTable
// // // //         const tableColumn = ["Nama", "Departemen", "Waktu Check In", "Status"];
// // // //         const tableRows = [];

// // // //         attendanceData.forEach(item => {
// // // //             const rowData = [
// // // //                 item.name,
// // // //                 item.department,
// // // //                 item.checkIn || "-", // Tampilkan "-" jika checkIn null
// // // //                 item.status,
// // // //             ];
// // // //             tableRows.push(rowData);
// // // //         });

// // // //         // Buat tabel menggunakan autoTable
// // // //         doc.autoTable({
// // // //             head: [tableColumn],
// // // //             body: tableRows,
// // // //             startY: 35,
// // // //             theme: 'grid',
// // // //             headStyles: { fillColor: [22, 160, 133] }, // Warna header
// // // //         });

// // // //         doc.save(`Attendance_Report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
// // // //     };


// // // //     const getStatusPill = (status) => {
// // // //         switch(status) {
// // // //             case 'On Time': return 'bg-green-100 text-green-700';
// // // //             case 'Late': return 'bg-yellow-100 text-yellow-700';
// // // //             case 'Absent': return 'bg-red-100 text-red-700';
// // // //             default: return 'bg-gray-100 text-gray-700';
// // // //         }
// // // //     }

// // // //     return (
// // // //         <div>
// // // //             <Header user={user} />
            
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                 {statsCardsData.map(item => <StatCard key={item.title} item={item} />)}
// // // //             </div>

// // // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
// // // //                 <div className="lg:col-span-2">
// // // //                     {/* TABEL ATTENDANCE */}
// // // //                     <div className="bg-white p-6 rounded-2xl shadow-md">
// // // //                         <h3 className="text-xl font-bold text-gray-800">Attendance Status</h3>
// // // //                         <p className="text-gray-500 mb-4">Overview of Daily Attendance Records</p>
                        
// // // //                         <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
// // // //                             <div className="flex items-center space-x-2">
// // // //                                 <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><FaSync className="mr-2"/> Refresh</button>
// // // //                                 <button 
// // // //                                     onClick={() => setIsModalOpen(true)}
// // // //                                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
// // // //                                     <FaUserPlus className="mr-2"/> Add Employee
// // // //                                 </button>
// // // //                             </div>
// // // //                             <div className="relative">
// // // //                                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // //                                 <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-lg" />
// // // //                             </div>
// // // //                              <div className="flex items-center space-x-2">
// // // //                                 {/* Hubungkan fungsi ke tombol */}
// // // //                                 <button 
// // // //                                     onClick={handleDownloadExcel}
// // // //                                     className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
// // // //                                     <FaFileExcel className="mr-2"/> Download Excel
// // // //                                 </button>
// // // //                                 <button 
// // // //                                     onClick={handleExportPdf}
// // // //                                     className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
// // // //                                     <FaFilePdf className="mr-2"/> Export to PDF
// // // //                                 </button>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="overflow-x-auto">
// // // //                             <table className="w-full text-left">
// // // //                                 <thead>
// // // //                                     <tr className="text-gray-500">
// // // //                                         <th className="py-2">Users</th>
// // // //                                         <th className="py-2">Department</th>
// // // //                                         <th className="py-2">Check In Time</th>
// // // //                                         <th className="py-2">Status</th>
// // // //                                     </tr>
// // // //                                 </thead>
// // // //                                 <tbody>
// // // //                                     {attendanceData.map(row => (
// // // //                                         <tr key={row.id} className="border-t">
// // // //                                             <td className="py-4">
// // // //                                                 <div className="flex items-center">
// // // //                                                     <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-600 mr-3">
// // // //                                                         {row.name.charAt(0)}{row.name.split(' ')[1] ? row.name.split(' ')[1].charAt(0) : ''}
// // // //                                                     </div>
// // // //                                                     <div>
// // // //                                                         <p className="font-semibold">{row.name}</p>
// // // //                                                         <p className="text-sm text-gray-500">{row.username}</p>
// // // //                                                     </div>
// // // //                                                 </div>
// // // //                                             </td>
// // // //                                             <td className="py-4">{row.department}</td>
// // // //                                             <td className="py-4">{row.checkIn || '-'}</td>
// // // //                                             <td className="py-4">
// // // //                                                 <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusPill(row.status)}`}>
// // // //                                                     {row.status}
// // // //                                                 </span>
// // // //                                             </td>
// // // //                                         </tr>
// // // //                                     ))}
// // // //                                 </tbody>
// // // //                             </table>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Sidebar Kanan */}
// // // //                 <div className="space-y-6">
// // // //                     <Calendar />
// // // //                     <div className="bg-white p-4 rounded-2xl shadow-md">
// // // //                         <h3 className="font-bold mb-2">Working Hours</h3>
// // // //                         <div className="text-sm text-gray-600 space-y-2">
// // // //                             <p>Working Hours MWR: 8:00 AM - 15:50 PM</p>
// // // //                             <p>Working Hours EDV: 8:00 AM - 15:50 PM</p>
// // // //                         </div>
// // // //                     </div>
// // // //                     <div className="bg-white p-4 rounded-2xl shadow-md">
// // // //                         <h3 className="font-bold mb-2">Employee by Gender</h3>
// // // //                         <div style={{ width: '100%', height: 200 }}>
// // // //                              <ResponsiveContainer>
// // // //                                 <PieChart>
// // // //                                     <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
// // // //                                         {genderData.map((entry, index) => (
// // // //                                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// // // //                                         ))}
// // // //                                     </Pie>
// // // //                                     <Tooltip />
// // // //                                 </PieChart>
// // // //                             </ResponsiveContainer>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //             <AddEmployeeModal 
// // // //                 isOpen={isModalOpen} 
// // // //                 onClose={() => setIsModalOpen(false)}
// // // //                 onUserAdded={handleUserAdded}
// // // //             />
// // // //         </div>
// // // //     );
// // // // };

// // // // export default DashboardPage;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { format, getDaysInMonth, getDay, startOfMonth } from 'date-fns';
// // // import {
// // //   Calendar, Clock, FileText, Home, Plus, Search, User, Users, CheckCircle, XCircle, AlertCircle, Download, RefreshCw, ChevronLeft, ChevronRight, Eye, Bell, LogOut
// // // } from 'lucide-react';

// // // // ==================================
// // // // Helper Components (UI Kit)
// // // // ==================================
// // // const Card = ({ children, className }) => <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>;
// // // const CardHeader = ({ children }) => <div className="p-6 border-b border-gray-200">{children}</div>;
// // // const CardTitle = ({ children }) => <h3 className="text-lg font-semibold text-gray-800">{children}</h3>;
// // // const CardDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
// // // const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;

// // // const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
// // //   const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
// // //   const variants = {
// // //     default: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800",
// // //     destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
// // //     outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400",
// // //     ghost: "hover:bg-gray-100 text-gray-700",
// // //     success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
// // //   };
// // //   const sizes = {
// // //     sm: "px-3 py-1.5 text-xs",
// // //     md: "px-4 py-2 text-sm",
// // //   };
// // //   return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
// // // };

// // // const Badge = ({ children, variant = 'default', className = '' }) => {
// // //     const variants = {
// // //         default: "bg-blue-100 text-blue-800",
// // //         destructive: "bg-red-100 text-red-800",
// // //         secondary: "bg-gray-100 text-gray-800",
// // //         outline: "border text-gray-600",
// // //         success: "bg-green-100 text-green-800",
// // //     };
// // //     return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>{children}</span>;
// // // };

// // // const Avatar = ({ children }) => <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{children}</div>;

// // // const Table = ({ children }) => <div className="overflow-x-auto"><table className="w-full text-left">{children}</table></div>;
// // // const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
// // // const TableRow = ({ children }) => <tr className="border-b last:border-b-0 hover:bg-gray-50">{children}</tr>;
// // // const TableHead = ({ children }) => <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
// // // const TableCell = ({ children, className }) => <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>;
// // // const TableBody = ({ children }) => <tbody>{children}</tbody>;

// // // const Dialog = ({ open, onClose, title, description, children }) => {
// // //     if (!open) return null;
// // //     return (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
// // //             <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative p-6" onClick={e => e.stopPropagation()}>
// // //                  <div className="mb-4">
// // //                     <h3 className="text-lg font-semibold">{title}</h3>
// // //                     <p className="text-sm text-gray-500">{description}</p>
// // //                  </div>
// // //                  {children}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // // ==================================
// // // // Main Dashboard Component
// // // // ==================================
// // // const DashboardPage = () => {
// // //     // State for data
// // //     const [stats, setStats] = useState({ totalEmployee: 0, pendingAttendance: 0, leaveRequests: 0, onTimeToday: 0 });
// // //     const [attendance, setAttendance] = useState([]);
// // //     const [pendingAttendance, setPendingAttendance] = useState([]);
// // //     const [leaveRequests, setLeaveRequests] = useState([]);
// // //     const [employeeQuotas, setEmployeeQuotas] = useState([]);
    
// // //     // State for UI
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState('');
// // //     const [user, setUser] = useState(null);
// // //     const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    
// // //     // State for Calendar
// // //     const [currentDate, setCurrentDate] = useState(new Date());
// // //     const [selectedDate, setSelectedDate] = useState(null);
// // //     const [newEvent, setNewEvent] = useState("");

// // //     // --- Data Fetching ---
// // //     useEffect(() => {
// // //         const storedUser = JSON.parse(localStorage.getItem('user'));
// // //         setUser(storedUser);

// // //         const fetchAllData = async () => {
// // //             setLoading(true);
// // //             setError('');
// // //             try {
// // //                 const token = localStorage.getItem('authToken');
// // //                 const config = { headers: { Authorization: `Bearer ${token}` } };

// // //                 // Fetch all data in parallel
// // //                 const [statsRes, pendingAttendanceRes, leaveRequestsRes, quotasRes] = await Promise.all([
// // //                     axios.get('http://localhost:3000/api/dashboard/stats', config),
// // //                     axios.get('http://localhost:3000/api/attendance/pending', config),
// // //                     axios.get('http://localhost:3000/api/cuti/requests', config),
// // //                     axios.get('http://localhost:3000/api/quotas', config)
// // //                 ]);

// // //                 setStats(statsRes.data);
// // //                 setPendingAttendance(pendingAttendanceRes.data);
// // //                 setLeaveRequests(leaveRequestsRes.data);
// // //                 setEmployeeQuotas(quotasRes.data);

// // //                 // Mock attendance data for now
// // //                 setAttendance([
// // //                     { id: 1, name: "Jane Cooper", department: "Finance", checkIn: "07:59 AM", status: "On Time", avatar: "JC" },
// // //                     { id: 2, name: "Esther Howard", department: "IT", checkIn: "08:20 AM", status: "Late", avatar: "EH" },
// // //                 ]);

// // //             } catch (err) {
// // //                 setError('Gagal memuat data dasbor. Silakan coba lagi.');
// // //                 console.error(err);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchAllData();
// // //     }, []);
    
// // //     // --- Handlers ---
// // //     const handleUpdateLeaveStatus = async (id, status) => {
// // //         try {
// // //             const token = localStorage.getItem('authToken');
// // //             await axios.put(`http://localhost:3000/api/cuti/requests/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
// // //             // Refresh data
// // //             const res = await axios.get('http://localhost:3000/api/cuti/requests', { headers: { Authorization: `Bearer ${token}` } });
// // //             setLeaveRequests(res.data);
// // //         } catch (error) {
// // //             alert('Gagal memperbarui status cuti.');
// // //         }
// // //     };

// // //     const handleUpdateAttendanceStatus = async (id, status) => {
// // //          try {
// // //             const token = localStorage.getItem('authToken');
// // //             await axios.put(`http://localhost:3000/api/attendance/pending/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
// // //             // Refresh data
// // //             const res = await axios.get('http://localhost:3000/api/attendance/pending', { headers: { Authorization: `Bearer ${token}` } });
// // //             setPendingAttendance(res.data);
// // //         } catch (error) {
// // //             alert('Gagal memperbarui status absensi.');
// // //         }
// // //     };
    
// // //     // --- Calendar Logic ---
// // //     const daysInMonth = getDaysInMonth(currentDate);
// // //     const firstDay = getDay(startOfMonth(currentDate));
// // //     const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
// // //     const emptyDays = Array.from({ length: firstDay });

// // //     const navigateMonth = (direction) => {
// // //         setCurrentDate(prev => {
// // //             const newDate = new Date(prev);
// // //             newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
// // //             return newDate;
// // //         });
// // //     };

// // //     return (
// // //         <div>
// // //             {/* Header */}
// // //             <div className="flex justify-between items-center mb-6">
// // //                 <div>
// // //                     <h1 className="text-2xl font-bold text-gray-800">Good to see you again, {user?.name?.split(' ')[0] || 'Admin'}!</h1>
// // //                     <p className="text-gray-500">Semoga harimu produktif dan lancar 🚀</p>
// // //                 </div>
// // //                 <div className="flex items-center gap-4">
// // //                     <Button variant="ghost" size="sm"><Bell className="w-5 h-5"/></Button>
// // //                     <Avatar>{user?.name ? user.name.charAt(0) : 'A'}</Avatar>
// // //                 </div>
// // //             </div>

// // //             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // //                 {/* Main Content Area */}
// // //                 <div className="lg:col-span-3 space-y-6">
// // //                     {/* Stats Cards */}
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// // //                         <Card className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-cyan-100">Total Employee</p><p className="text-3xl font-bold">{stats.totalEmployee}</p></div><Users className="w-8 h-8 text-cyan-200" /></CardContent></Card>
// // //                         <Card className="bg-gradient-to-r from-pink-400 to-pink-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-pink-100">Pending Attendance</p><p className="text-3xl font-bold">{stats.pendingAttendance}</p></div><AlertCircle className="w-8 h-8 text-pink-200" /></CardContent></Card>
// // //                         <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-orange-100">Leave Requests</p><p className="text-3xl font-bold">{stats.leaveRequests}</p></div><Calendar className="w-8 h-8 text-orange-200" /></CardContent></Card>
// // //                         <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-purple-100">On Time Today</p><p className="text-3xl font-bold">{stats.onTimeToday}</p></div><CheckCircle className="w-8 h-8 text-purple-200" /></CardContent></Card>
// // //                     </div>

// // //                     {/* Attendance Status */}
// // //                     <Card>
// // //                         <CardHeader><CardTitle>Attendance Status</CardTitle><CardDescription>Overview of Daily Attendance Records</CardDescription></CardHeader>
// // //                         <CardContent>
// // //                             <Table>
// // //                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Department</TableHead><TableHead>Check In</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
// // //                                 <TableBody>
// // //                                     {attendance.map(emp => (
// // //                                         <TableRow key={emp.id}>
// // //                                             <TableCell><div className="flex items-center gap-3"><Avatar>{emp.avatar}</Avatar><span className="font-medium">{emp.name}</span></div></TableCell>
// // //                                             <TableCell>{emp.department}</TableCell>
// // //                                             <TableCell>{emp.checkIn}</TableCell>
// // //                                             <TableCell><Badge variant={emp.status === 'On Time' ? 'success' : 'destructive'}>{emp.status}</Badge></TableCell>
// // //                                         </TableRow>
// // //                                     ))}
// // //                                 </TableBody>
// // //                             </Table>
// // //                         </CardContent>
// // //                     </Card>

// // //                     {/* Leave Requests */}
// // //                     <Card>
// // //                         <CardHeader><CardTitle>Leave Requests</CardTitle><CardDescription>Pending leave applications</CardDescription></CardHeader>
// // //                         <CardContent>
// // //                             <Table>
// // //                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Duration</TableHead><TableHead>Days</TableHead><TableHead>Remaining Quota</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
// // //                                 <TableBody>
// // //                                     {leaveRequests.map(req => {
// // //                                         const remaining = req.employee_quotas.total_quota - req.employee_quotas.used_quota;
// // //                                         const duration = Math.ceil((new Date(req.end_date) - new Date(req.start_date)) / (1000 * 60 * 60 * 24)) + 1;
// // //                                         return (
// // //                                         <TableRow key={req.id}>
// // //                                             <TableCell><div className="font-medium">{req.users.name}</div><div className="text-xs text-gray-500">{req.reason}</div></TableCell>
// // //                                             <TableCell>{format(new Date(req.start_date), 'dd MMM')} - {format(new Date(req.end_date), 'dd MMM yyyy')}</TableCell>
// // //                                             <TableCell>{duration} days</TableCell>
// // //                                             <TableCell><Badge variant={remaining > 0 ? 'success' : 'destructive'}>{remaining} days left</Badge></TableCell>
// // //                                             <TableCell>
// // //                                                 <div className="flex gap-2">
// // //                                                     <Button size="sm" variant="success" onClick={() => handleUpdateLeaveStatus(req.id, 'Approved')}><CheckCircle className="w-4 h-4 mr-1"/>Approve</Button>
// // //                                                     <Button size="sm" variant="destructive" onClick={() => handleUpdateLeaveStatus(req.id, 'Rejected')}><XCircle className="w-4 h-4 mr-1"/>Reject</Button>
// // //                                                 </div>
// // //                                             </TableCell>
// // //                                         </TableRow>
// // //                                     )})}
// // //                                 </TableBody>
// // //                             </Table>
// // //                         </CardContent>
// // //                     </Card>

// // //                     {/* Pending Attendance Requests */}
// // //                      <Card>
// // //                         <CardHeader><CardTitle>Pending Attendance Requests</CardTitle><CardDescription>Late arrival and attendance modification requests</CardDescription></CardHeader>
// // //                         <CardContent>
// // //                              <Table>
// // //                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Date</TableHead><TableHead>Reason</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
// // //                                 <TableBody>
// // //                                     {pendingAttendance.map(req => (
// // //                                         <TableRow key={req.id}>
// // //                                             <TableCell className="font-medium">{req.users.name}</TableCell>
// // //                                             <TableCell>{format(new Date(req.request_date), 'dd MMM yyyy')}</TableCell>
// // //                                             <TableCell>{req.reason}</TableCell>
// // //                                             <TableCell>
// // //                                                 <div className="flex gap-2">
// // //                                                     <Button size="sm" variant="success" onClick={() => handleUpdateAttendanceStatus(req.id, 'Approved')}><CheckCircle className="w-4 h-4 mr-1"/>Approve</Button>
// // //                                                     <Button size="sm" variant="destructive" onClick={() => handleUpdateAttendanceStatus(req.id, 'Rejected')}><XCircle className="w-4 h-4 mr-1"/>Reject</Button>
// // //                                                 </div>
// // //                                             </TableCell>
// // //                                         </TableRow>
// // //                                     ))}
// // //                                 </TableBody>
// // //                             </Table>
// // //                         </CardContent>
// // //                     </Card>

// // //                 </div>

// // //                 {/* Right Sidebar */}
// // //                 <div className="space-y-6">
// // //                     <Card>
// // //                         <CardHeader>
// // //                             <div className="flex items-center justify-between">
// // //                                 <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
// // //                                 <div className="flex gap-1">
// // //                                     <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}><ChevronLeft className="w-4 h-4" /></Button>
// // //                                     <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}><ChevronRight className="w-4 h-4" /></Button>
// // //                                 </div>
// // //                             </div>
// // //                         </CardHeader>
// // //                         <CardContent>
// // //                             <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs text-gray-500 font-medium">
// // //                                 {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d}>{d}</div>)}
// // //                             </div>
// // //                             <div className="grid grid-cols-7 gap-1">
// // //                                 {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
// // //                                 {days.map(day => <button key={day} onClick={() => { setSelectedDate(day); setIsEventModalOpen(true); }} className={`p-2 text-sm rounded-full hover:bg-blue-100 ${selectedDate === day ? 'bg-blue-500 text-white' : ''}`}>{day}</button>)}
// // //                             </div>
// // //                         </CardContent>
// // //                     </Card>
// // //                     <Button className="w-full" onClick={() => setIsEventModalOpen(true)}><Plus className="w-4 h-4 mr-2"/>Add Calendar Event</Button>
// // //                 </div>
// // //             </div>

// // //             <Dialog open={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title="Add New Event" description={`Create a new event for ${selectedDate ? format(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate), 'dd MMMM yyyy') : 'selected date'}`}>
// // //                 <div className="space-y-4 mt-4">
// // //                     <input placeholder="Event title..." value={newEvent} onChange={e => setNewEvent(e.target.value)} className="w-full p-2 border rounded-md"/>
// // //                     <Button className="w-full" onClick={() => { console.log('Adding event...'); setIsEventModalOpen(false); }}>Add Event</Button>
// // //                 </div>
// // //             </Dialog>
// // //         </div>
// // //     );
// // // };

// // // export default DashboardPage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { format, getDaysInMonth, getDay, startOfMonth } from 'date-fns';
// // import {
// //   Calendar, Clock, FileText, Home, Plus, Search, User, Users, CheckCircle, XCircle, AlertCircle, Download, RefreshCw, ChevronLeft, ChevronRight, Eye, Bell, LogOut
// // } from 'lucide-react';

// // // ==================================
// // // Helper Components (UI Kit)
// // // ==================================
// // const Card = ({ children, className }) => <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>;
// // const CardHeader = ({ children }) => <div className="p-6 border-b border-gray-200">{children}</div>;
// // const CardTitle = ({ children }) => <h3 className="text-lg font-semibold text-gray-800">{children}</h3>;
// // const CardDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
// // const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;

// // const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
// //   const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
// //   const variants = {
// //     default: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800",
// //     destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
// //     outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400",
// //     ghost: "hover:bg-gray-100 text-gray-700",
// //     success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
// //   };
// //   const sizes = {
// //     sm: "px-3 py-1.5 text-xs",
// //     md: "px-4 py-2 text-sm",
// //   };
// //   return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
// // };

// // const Badge = ({ children, variant = 'default', className = '' }) => {
// //     const variants = {
// //         default: "bg-blue-100 text-blue-800",
// //         destructive: "bg-red-100 text-red-800",
// //         secondary: "bg-gray-100 text-gray-800",
// //         outline: "border text-gray-600",
// //         success: "bg-green-100 text-green-800",
// //     };
// //     return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>{children}</span>;
// // };

// // const Avatar = ({ children }) => <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{children}</div>;

// // const Table = ({ children }) => <div className="overflow-x-auto"><table className="w-full text-left">{children}</table></div>;
// // const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
// // const TableRow = ({ children }) => <tr className="border-b last:border-b-0 hover:bg-gray-50">{children}</tr>;
// // const TableHead = ({ children }) => <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
// // const TableCell = ({ children, className }) => <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>;
// // const TableBody = ({ children }) => <tbody>{children}</tbody>;

// // const Dialog = ({ open, onClose, title, description, children }) => {
// //     if (!open) return null;
// //     return (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
// //             <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative p-6" onClick={e => e.stopPropagation()}>
// //                  <div className="mb-4">
// //                     <h3 className="text-lg font-semibold">{title}</h3>
// //                     <p className="text-sm text-gray-500">{description}</p>
// //                  </div>
// //                  {children}
// //             </div>
// //         </div>
// //     );
// // };

// // // ==================================
// // // Main Dashboard Component
// // // ==================================
// // const DashboardPage = () => {
// //     // State for data
// //     const [stats, setStats] = useState({ totalEmployee: 0, pendingAttendance: 0, leaveRequests: 0, onTimeToday: 0 });
// //     const [attendance, setAttendance] = useState([]);
// //     const [pendingAttendance, setPendingAttendance] = useState([]);
// //     const [leaveRequests, setLeaveRequests] = useState([]);
// //     const [employeeQuotas, setEmployeeQuotas] = useState([]);
    
// //     // State for UI
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const [user, setUser] = useState(null);
// //     const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    
// //     // State for Calendar
// //     const [currentDate, setCurrentDate] = useState(new Date());
// //     const [selectedDate, setSelectedDate] = useState(null);
// //     const [newEvent, setNewEvent] = useState("");

// //     // --- Data Fetching ---
// //     const fetchAllData = async () => {
// //         setLoading(true);
// //         setError('');
// //         try {
// //             const token = localStorage.getItem('authToken');
// //             const config = { headers: { Authorization: `Bearer ${token}` } };

// //             const [statsRes, pendingAttendanceRes, leaveRequestsRes, quotasRes] = await Promise.all([
// //                 axios.get('http://localhost:3000/api/dashboard/stats', config),
// //                 axios.get('http://localhost:3000/api/attendance/pending', config),
// //                 axios.get('http://localhost:3000/api/cuti/requests', config),
// //                 axios.get('http://localhost:3000/api/quotas', config)
// //             ]);

// //             setStats(statsRes.data);
// //             setPendingAttendance(pendingAttendanceRes.data);
// //             setLeaveRequests(leaveRequestsRes.data);
// //             setEmployeeQuotas(quotasRes.data);

// //             // Mock attendance data for now
// //             setAttendance([
// //                 { id: 1, name: "Jane Cooper", department: "Finance", checkIn: "07:59 AM", status: "On Time", avatar: "JC" },
// //                 { id: 2, name: "Esther Howard", department: "IT", checkIn: "08:20 AM", status: "Late", avatar: "EH" },
// //             ]);

// //         } catch (err) {
// //             setError('Gagal memuat data dasbor. Silakan coba lagi.');
// //             console.error(err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         const storedUser = JSON.parse(localStorage.getItem('user'));
// //         setUser(storedUser);
// //         fetchAllData();
// //     }, []);
    
// //     // --- Handlers ---
// //     const handleUpdateLeaveStatus = async (id, status) => {
// //         try {
// //             const token = localStorage.getItem('authToken');
// //             await axios.put(`http://localhost:3000/api/cuti/requests/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
// //             fetchAllData(); // Refresh all data
// //         } catch (error) {
// //             alert('Gagal memperbarui status cuti.');
// //         }
// //     };

// //     const handleUpdateAttendanceStatus = async (id, status) => {
// //          try {
// //             const token = localStorage.getItem('authToken');
// //             await axios.put(`http://localhost:3000/api/attendance/pending/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
// //             fetchAllData(); // Refresh all data
// //         } catch (error) {
// //             alert('Gagal memperbarui status absensi.');
// //         }
// //     };
    
// //     // --- Calendar Logic ---
// //     const daysInMonth = getDaysInMonth(currentDate);
// //     const firstDay = getDay(startOfMonth(currentDate));
// //     const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
// //     const emptyDays = Array.from({ length: firstDay });

// //     const navigateMonth = (direction) => {
// //         setCurrentDate(prev => {
// //             const newDate = new Date(prev);
// //             newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
// //             return newDate;
// //         });
// //     };

// //     return (
// //         <div>
// //             {/* Header */}
// //             <div className="flex justify-between items-center mb-6">
// //                 <div>
// //                     <h1 className="text-2xl font-bold text-gray-800">Good to see you again, {user?.name?.split(' ')[0] || 'Admin'}!</h1>
// //                     <p className="text-gray-500">Semoga harimu produktif dan lancar 🚀</p>
// //                 </div>
// //                 <div className="flex items-center gap-4">
// //                     <Button variant="ghost" size="sm"><Bell className="w-5 h-5"/></Button>
// //                     <Avatar>{user?.name ? user.name.charAt(0) : 'A'}</Avatar>
// //                 </div>
// //             </div>

// //             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// //                 {/* Main Content Area */}
// //                 <div className="lg:col-span-3 space-y-6">
// //                     {/* Stats Cards */}
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //                         <Card className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-cyan-100">Total Employee</p><p className="text-3xl font-bold">{stats.totalEmployee}</p></div><Users className="w-8 h-8 text-cyan-200" /></CardContent></Card>
// //                         <Card className="bg-gradient-to-r from-pink-400 to-pink-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-pink-100">Pending Attendance</p><p className="text-3xl font-bold">{stats.pendingAttendance}</p></div><AlertCircle className="w-8 h-8 text-pink-200" /></CardContent></Card>
// //                         <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-orange-100">Leave Requests</p><p className="text-3xl font-bold">{stats.leaveRequests}</p></div><Calendar className="w-8 h-8 text-orange-200" /></CardContent></Card>
// //                         <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-purple-100">On Time Today</p><p className="text-3xl font-bold">{stats.onTimeToday}</p></div><CheckCircle className="w-8 h-8 text-purple-200" /></CardContent></Card>
// //                     </div>

// //                     {/* Attendance Status */}
// //                     <Card>
// //                         <CardHeader><CardTitle>Attendance Status</CardTitle><CardDescription>Overview of Daily Attendance Records</CardDescription></CardHeader>
// //                         <CardContent>
// //                             <Table>
// //                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Department</TableHead><TableHead>Check In</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
// //                                 <TableBody>
// //                                     {attendance.map(emp => (
// //                                         <TableRow key={emp.id}>
// //                                             <TableCell><div className="flex items-center gap-3"><Avatar>{emp.avatar}</Avatar><span className="font-medium">{emp.name}</span></div></TableCell>
// //                                             <TableCell>{emp.department}</TableCell>
// //                                             <TableCell>{emp.checkIn}</TableCell>
// //                                             <TableCell><Badge variant={emp.status === 'On Time' ? 'success' : 'destructive'}>{emp.status}</Badge></TableCell>
// //                                         </TableRow>
// //                                     ))}
// //                                 </TableBody>
// //                             </Table>
// //                         </CardContent>
// //                     </Card>

// //                     {/* Leave Requests */}
// //                     <Card>
// //                         <CardHeader><CardTitle>Leave Requests</CardTitle><CardDescription>Pending leave applications</CardDescription></CardHeader>
// //                         <CardContent>
// //                             <Table>
// //                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Duration</TableHead><TableHead>Days</TableHead><TableHead>Remaining Quota</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
// //                                 <TableBody>
// //                                     {leaveRequests.filter(r => r.status === 'Pending').map(req => {
// //                                         const remaining = req.employee_quotas.total_quota - req.employee_quotas.used_quota;
// //                                         const duration = Math.ceil((new Date(req.end_date) - new Date(req.start_date)) / (1000 * 60 * 60 * 24)) + 1;
// //                                         return (
// //                                         <TableRow key={req.id}>
// //                                             <TableCell><div className="font-medium">{req.users.name}</div><div className="text-xs text-gray-500">{req.reason}</div></TableCell>
// //                                             <TableCell>{format(new Date(req.start_date), 'dd MMM')} - {format(new Date(req.end_date), 'dd MMM yyyy')}</TableCell>
// //                                             <TableCell>{duration} days</TableCell>
// //                                             <TableCell><Badge variant={remaining > 0 ? 'success' : 'destructive'}>{remaining} days left</Badge></TableCell>
// //                                             <TableCell>
// //                                                 <div className="flex gap-2">
// //                                                     <Button size="sm" variant="success" onClick={() => handleUpdateLeaveStatus(req.id, 'Approved')}><CheckCircle className="w-4 h-4 mr-1"/>Approve</Button>
// //                                                     <Button size="sm" variant="destructive" onClick={() => handleUpdateLeaveStatus(req.id, 'Rejected')}><XCircle className="w-4 h-4 mr-1"/>Reject</Button>
// //                                                 </div>
// //                                             </TableCell>
// //                                         </TableRow>
// //                                     )})}
// //                                 </TableBody>
// //                             </Table>
// //                         </CardContent>
// //                     </Card>

// //                     {/* Employee Leave Quota */}
// //                     <Card>
// //                         <CardHeader><CardTitle>Employee Leave Quota</CardTitle><CardDescription>Overview of annual leave quota for all employees</CardDescription></CardHeader>
// //                         <CardContent>
// //                             <Table>
// //                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Department</TableHead><TableHead>Total</TableHead><TableHead>Used</TableHead><TableHead>Remaining</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
// //                                 <TableBody>
// //                                     {employeeQuotas.map(q => {
// //                                         const remaining = q.total_quota - q.used_quota;
// //                                         return (
// //                                         <TableRow key={q.id}>
// //                                             <TableCell><div className="flex items-center gap-3"><Avatar>{q.users.name.charAt(0)}</Avatar><span className="font-medium">{q.users.name}</span></div></TableCell>
// //                                             <TableCell>{q.users.department || 'N/A'}</TableCell>
// //                                             <TableCell>{q.total_quota} days</TableCell>
// //                                             <TableCell>{q.used_quota} days</TableCell>
// //                                             <TableCell className={`font-medium ${remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>{remaining} days</TableCell>
// //                                             <TableCell><Badge variant={remaining > 0 ? 'success' : 'destructive'}>{remaining > 0 ? 'Available' : 'Exhausted'}</Badge></TableCell>
// //                                         </TableRow>
// //                                     )})}
// //                                 </TableBody>
// //                             </Table>
// //                         </CardContent>
// //                     </Card>

// //                     {/* Pending Attendance Requests */}
// //                      <Card>
// //                         <CardHeader><CardTitle>Pending Attendance Requests</CardTitle><CardDescription>Late arrival and attendance modification requests</CardDescription></CardHeader>
// //                         <CardContent>
// //                              <Table>
// //                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Date</TableHead><TableHead>Reason</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
// //                                 <TableBody>
// //                                     {pendingAttendance.map(req => (
// //                                         <TableRow key={req.id}>
// //                                             <TableCell className="font-medium">{req.users.name}</TableCell>
// //                                             <TableCell>{format(new Date(req.request_date), 'dd MMM yyyy')}</TableCell>
// //                                             <TableCell>{req.reason}</TableCell>
// //                                             <TableCell>
// //                                                 <div className="flex gap-2">
// //                                                     <Button size="sm" variant="success" onClick={() => handleUpdateAttendanceStatus(req.id, 'Approved')}><CheckCircle className="w-4 h-4 mr-1"/>Approve</Button>
// //                                                     <Button size="sm" variant="destructive" onClick={() => handleUpdateAttendanceStatus(req.id, 'Rejected')}><XCircle className="w-4 h-4 mr-1"/>Reject</Button>
// //                                                 </div>
// //                                             </TableCell>
// //                                         </TableRow>
// //                                     ))}
// //                                 </TableBody>
// //                             </Table>
// //                         </CardContent>
// //                     </Card>

// //                 </div>

// //                 {/* Right Sidebar */}
// //                 <div className="space-y-6">
// //                     <Card>
// //                         <CardHeader>
// //                             <div className="flex items-center justify-between">
// //                                 <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
// //                                 <div className="flex gap-1">
// //                                     <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}><ChevronLeft className="w-4 h-4" /></Button>
// //                                     <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}><ChevronRight className="w-4 h-4" /></Button>
// //                                 </div>
// //                             </div>
// //                         </CardHeader>
// //                         <CardContent>
// //                             <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs text-gray-500 font-medium">
// //                                 {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d}>{d}</div>)}
// //                             </div>
// //                             <div className="grid grid-cols-7 gap-1">
// //                                 {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
// //                                 {days.map(day => <button key={day} onClick={() => { setSelectedDate(day); setIsEventModalOpen(true); }} className={`p-2 text-sm rounded-full hover:bg-blue-100 ${selectedDate === day ? 'bg-blue-500 text-white' : ''}`}>{day}</button>)}
// //                             </div>
// //                         </CardContent>
// //                     </Card>
// //                     <Button className="w-full" onClick={() => setIsEventModalOpen(true)}><Plus className="w-4 h-4 mr-2"/>Add Calendar Event</Button>
                    
// //                     {/* Working Hours Card */}
// //                     <Card>
// //                         <CardHeader><CardTitle>Working Hours</CardTitle></CardHeader>
// //                         <CardContent className="space-y-2 text-sm">
// //                             <div className="flex justify-between"><span className="text-gray-600">MWR</span><span className="font-medium">08:00 - 16:50</span></div>
// //                             <div className="flex justify-between"><span className="text-gray-600">EDV</span><span className="font-medium">08:00 - 16:50</span></div>
// //                         </CardContent>
// //                     </Card>

// //                     {/* Employee by Gender Card */}
// //                     <Card>
// //                         <CardHeader><CardTitle>Employee by Gender</CardTitle></CardHeader>
// //                         <CardContent className="flex flex-col items-center">
// //                             <div className="relative w-32 h-32">
// //                                 <svg className="w-full h-full" viewBox="0 0 36 36">
// //                                     <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fecaca" strokeWidth="3" />
// //                                     <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="60, 100" />
// //                                 </svg>
// //                                 <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{stats.totalEmployee}</div>
// //                             </div>
// //                             <div className="w-full mt-4 space-y-2 text-sm">
// //                                 <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400"></span>Male</div><span className="font-medium">60%</span></div>
// //                                 <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-300"></span>Female</div><span className="font-medium">40%</span></div>
// //                             </div>
// //                         </CardContent>
// //                     </Card>
// //                 </div>
// //             </div>

// //             <Dialog open={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title="Add New Event" description={`Create a new event for ${selectedDate ? format(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate), 'dd MMMM yyyy') : 'selected date'}`}>
// //                 <div className="space-y-4 mt-4">
// //                     <input placeholder="Event title..." value={newEvent} onChange={e => setNewEvent(e.target.value)} className="w-full p-2 border rounded-md"/>
// //                     <textarea placeholder="Description (optional)..." className="w-full p-2 border rounded-md min-h-[100px]"></textarea>
// //                     <Button className="w-full" onClick={() => { console.log('Adding event...'); setIsEventModalOpen(false); }}>Add Event</Button>
// //                 </div>
// //             </Dialog>
// //         </div>
// //     );
// // };

// // export default DashboardPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { format, getDaysInMonth, getDay, startOfMonth } from 'date-fns';
// import {
//   Calendar, Clock, FileText, Home, Plus, Search, User, Users, CheckCircle, XCircle, AlertCircle, Download, RefreshCw, ChevronLeft, ChevronRight, Eye, Bell, LogOut
// } from 'lucide-react';

// // ==================================
// // Helper Components (UI Kit)
// // ==================================
// const Card = ({ children, className }) => <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>;
// const CardHeader = ({ children }) => <div className="p-6 border-b border-gray-200">{children}</div>;
// const CardTitle = ({ children }) => <h3 className="text-lg font-semibold text-gray-800">{children}</h3>;
// const CardDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
// const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;

// const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
//   const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
//   const variants = {
//     default: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800",
//     destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
//     outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400",
//     ghost: "hover:bg-gray-100 text-gray-700",
//     success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
//   };
//   const sizes = {
//     sm: "px-3 py-1.5 text-xs",
//     md: "px-4 py-2 text-sm",
//   };
//   return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
// };

// const Badge = ({ children, variant = 'default', className = '' }) => {
//     const variants = {
//         default: "bg-blue-100 text-blue-800",
//         destructive: "bg-red-100 text-red-800",
//         secondary: "bg-gray-100 text-gray-800",
//         outline: "border text-gray-600",
//         success: "bg-green-100 text-green-800",
//     };
//     return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>{children}</span>;
// };

// const Avatar = ({ children }) => <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{children}</div>;

// const Table = ({ children }) => <div className="overflow-x-auto"><table className="w-full text-left">{children}</table></div>;
// const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
// const TableRow = ({ children }) => <tr className="border-b last:border-b-0 hover:bg-gray-50">{children}</tr>;
// const TableHead = ({ children }) => <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
// const TableCell = ({ children, className }) => <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>;
// const TableBody = ({ children }) => <tbody>{children}</tbody>;

// const Dialog = ({ open, onClose, title, description, children }) => {
//     if (!open) return null;
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative p-6" onClick={e => e.stopPropagation()}>
//                  <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">&times;</button>
//                  <div className="mb-4">
//                     <h3 className="text-lg font-semibold">{title}</h3>
//                     <p className="text-sm text-gray-500">{description}</p>
//                  </div>
//                  {children}
//             </div>
//         </div>
//     );
// };

// // ==================================
// // Main Dashboard Component
// // ==================================
// const DashboardPage = () => {
//     // State for data
//     const [stats, setStats] = useState({ totalEmployee: 0, pendingAttendance: 0, leaveRequests: 0, onTimeToday: 0 });
//     const [attendance, setAttendance] = useState([]);
//     const [pendingAttendance, setPendingAttendance] = useState([]);
//     const [leaveRequests, setLeaveRequests] = useState([]);
//     const [employeeQuotas, setEmployeeQuotas] = useState([]);
    
//     // State for UI
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [user, setUser] = useState(null);
//     const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    
//     // State for Calendar
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [newEventTitle, setNewEventTitle] = useState("");
//     const [newEventDescription, setNewEventDescription] = useState("");

//     // --- Data Fetching ---
//     const fetchAllData = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const token = localStorage.getItem('authToken');
//             const config = { headers: { Authorization: `Bearer ${token}` } };

//             const [statsRes, pendingAttendanceRes, leaveRequestsRes, quotasRes] = await Promise.all([
//                 axios.get('http://localhost:3000/api/dashboard/stats', config),
//                 axios.get('http://localhost:3000/api/attendance/pending', config),
//                 axios.get('http://localhost:3000/api/cuti/requests', config),
//                 axios.get('http://localhost:3000/api/quotas', config)
//             ]);

//             setStats(statsRes.data);
//             setPendingAttendance(pendingAttendanceRes.data);
//             setLeaveRequests(leaveRequestsRes.data);
//             setEmployeeQuotas(quotasRes.data);

//             // Mock attendance data for now
//             setAttendance([
//                 { id: 1, name: "Jane Cooper", department: "Finance", checkIn: "07:59 AM", status: "On Time", avatar: "JC" },
//                 { id: 2, name: "Esther Howard", department: "IT", checkIn: "08:20 AM", status: "Late", avatar: "EH" },
//             ]);

//         } catch (err) {
//             setError('Gagal memuat data dasbor. Silakan coba lagi.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         setUser(storedUser);
//         fetchAllData();
//     }, []);
    
//     // --- Handlers ---
//     const handleUpdateLeaveStatus = async (id, status) => {
//         try {
//             const token = localStorage.getItem('authToken');
//             await axios.put(`http://localhost:3000/api/cuti/requests/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
//             fetchAllData(); // Refresh all data
//         } catch (error) {
//             alert('Gagal memperbarui status cuti.');
//         }
//     };

//     const handleUpdateAttendanceStatus = async (id, status) => {
//          try {
//             const token = localStorage.getItem('authToken');
//             await axios.put(`http://localhost:3000/api/attendance/pending/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
//             fetchAllData(); // Refresh all data
//         } catch (error) {
//             alert('Gagal memperbarui status absensi.');
//         }
//     };

//     const handleAddEvent = () => {
//         if (!newEventTitle || !selectedDate) {
//             alert("Event title and date are required.");
//             return;
//         }
//         // Di sini Anda akan menambahkan logika untuk mengirim event ke backend
//         console.log({
//             title: newEventTitle,
//             description: newEventDescription,
//             date: new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate)
//         });
//         // Reset state and close modal
//         setNewEventTitle("");
//         setNewEventDescription("");
//         setIsEventModalOpen(false);
//         setSelectedDate(null);
//     };
    
//     // --- Calendar Logic ---
//     const daysInMonth = getDaysInMonth(currentDate);
//     const firstDay = getDay(startOfMonth(currentDate));
//     const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
//     const emptyDays = Array.from({ length: firstDay });

//     const navigateMonth = (direction) => {
//         setCurrentDate(prev => {
//             const newDate = new Date(prev);
//             newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
//             return newDate;
//         });
//     };

//     return (
//         <div>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-800">Good to see you again, {user?.name?.split(' ')[0] || 'Admin'}!</h1>
//                     <p className="text-gray-500">Semoga harimu produktif dan lancar 🚀</p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <Button variant="ghost" size="sm"><Bell className="w-5 h-5"/></Button>
//                     <Avatar>{user?.name ? user.name.charAt(0) : 'A'}</Avatar>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                 {/* Main Content Area */}
//                 <div className="lg:col-span-3 space-y-6">
//                     {/* Stats Cards */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <Card className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-cyan-100">Total Employee</p><p className="text-3xl font-bold">{stats.totalEmployee}</p></div><Users className="w-8 h-8 text-cyan-200" /></CardContent></Card>
//                         <Card className="bg-gradient-to-r from-pink-400 to-pink-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-pink-100">Pending Attendance</p><p className="text-3xl font-bold">{stats.pendingAttendance}</p></div><AlertCircle className="w-8 h-8 text-pink-200" /></CardContent></Card>
//                         <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-orange-100">Leave Requests</p><p className="text-3xl font-bold">{stats.leaveRequests}</p></div><Calendar className="w-8 h-8 text-orange-200" /></CardContent></Card>
//                         <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white"><CardContent className="p-6 flex justify-between items-center"><div><p className="text-purple-100">On Time Today</p><p className="text-3xl font-bold">{stats.onTimeToday}</p></div><CheckCircle className="w-8 h-8 text-purple-200" /></CardContent></Card>
//                     </div>

//                     {/* Attendance Status */}
//                     <Card>
//                         <CardHeader><CardTitle>Attendance Status</CardTitle><CardDescription>Overview of Daily Attendance Records</CardDescription></CardHeader>
//                         <CardContent>
//                             <Table>
//                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Department</TableHead><TableHead>Check In</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
//                                 <TableBody>
//                                     {attendance.map(emp => (
//                                         <TableRow key={emp.id}>
//                                             <TableCell><div className="flex items-center gap-3"><Avatar>{emp.avatar}</Avatar><span className="font-medium">{emp.name}</span></div></TableCell>
//                                             <TableCell>{emp.department}</TableCell>
//                                             <TableCell>{emp.checkIn}</TableCell>
//                                             <TableCell><Badge variant={emp.status === 'On Time' ? 'success' : 'destructive'}>{emp.status}</Badge></TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>

//                     {/* Leave Requests */}
//                     <Card>
//                         <CardHeader><CardTitle>Leave Requests</CardTitle><CardDescription>Pending leave applications</CardDescription></CardHeader>
//                         <CardContent>
//                             <Table>
//                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Duration</TableHead><TableHead>Days</TableHead><TableHead>Remaining Quota</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
//                                 <TableBody>
//                                     {leaveRequests.filter(r => r.status === 'Pending').map(req => {
//                                         const remaining = req.employee_quotas.total_quota - req.employee_quotas.used_quota;
//                                         const duration = Math.ceil((new Date(req.end_date) - new Date(req.start_date)) / (1000 * 60 * 60 * 24)) + 1;
//                                         return (
//                                         <TableRow key={req.id}>
//                                             <TableCell><div className="font-medium">{req.users.name}</div><div className="text-xs text-gray-500">{req.reason}</div></TableCell>
//                                             <TableCell>{format(new Date(req.start_date), 'dd MMM')} - {format(new Date(req.end_date), 'dd MMM yyyy')}</TableCell>
//                                             <TableCell>{duration} days</TableCell>
//                                             <TableCell><Badge variant={remaining > 0 ? 'success' : 'destructive'}>{remaining} days left</Badge></TableCell>
//                                             <TableCell>
//                                                 <div className="flex gap-2">
//                                                     <Button size="sm" variant="success" onClick={() => handleUpdateLeaveStatus(req.id, 'Approved')}><CheckCircle className="w-4 h-4 mr-1"/>Approve</Button>
//                                                     <Button size="sm" variant="destructive" onClick={() => handleUpdateLeaveStatus(req.id, 'Rejected')}><XCircle className="w-4 h-4 mr-1"/>Reject</Button>
//                                                 </div>
//                                             </TableCell>
//                                         </TableRow>
//                                     )})}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>

//                     {/* Employee Leave Quota */}
//                     <Card>
//                         <CardHeader><CardTitle>Employee Leave Quota</CardTitle><CardDescription>Overview of annual leave quota for all employees</CardDescription></CardHeader>
//                         <CardContent>
//                             <Table>
//                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Department</TableHead><TableHead>Total</TableHead><TableHead>Used</TableHead><TableHead>Remaining</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
//                                 <TableBody>
//                                     {employeeQuotas.map(q => {
//                                         const remaining = q.total_quota - q.used_quota;
//                                         return (
//                                         <TableRow key={q.id}>
//                                             <TableCell><div className="flex items-center gap-3"><Avatar>{q.users.name.charAt(0)}</Avatar><span className="font-medium">{q.users.name}</span></div></TableCell>
//                                             <TableCell>{q.users.department || 'N/A'}</TableCell>
//                                             <TableCell>{q.total_quota} days</TableCell>
//                                             <TableCell>{q.used_quota} days</TableCell>
//                                             <TableCell className={`font-medium ${remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>{remaining} days</TableCell>
//                                             <TableCell><Badge variant={remaining > 0 ? 'success' : 'destructive'}>{remaining > 0 ? 'Available' : 'Exhausted'}</Badge></TableCell>
//                                         </TableRow>
//                                     )})}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>

//                     {/* Pending Attendance Requests */}
//                      <Card>
//                         <CardHeader><CardTitle>Pending Attendance Requests</CardTitle><CardDescription>Late arrival and attendance modification requests</CardDescription></CardHeader>
//                         <CardContent>
//                              <Table>
//                                 <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Date</TableHead><TableHead>Reason</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
//                                 <TableBody>
//                                     {pendingAttendance.map(req => (
//                                         <TableRow key={req.id}>
//                                             <TableCell className="font-medium">{req.users.name}</TableCell>
//                                             <TableCell>{format(new Date(req.request_date), 'dd MMM yyyy')}</TableCell>
//                                             <TableCell>{req.reason}</TableCell>
//                                             <TableCell>
//                                                 <div className="flex gap-2">
//                                                     <Button size="sm" variant="success" onClick={() => handleUpdateAttendanceStatus(req.id, 'Approved')}><CheckCircle className="w-4 h-4 mr-1"/>Approve</Button>
//                                                     <Button size="sm" variant="destructive" onClick={() => handleUpdateAttendanceStatus(req.id, 'Rejected')}><XCircle className="w-4 h-4 mr-1"/>Reject</Button>
//                                                 </div>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>

//                 </div>

//                 {/* Right Sidebar */}
//                 <div className="space-y-6">
//                     <Card>
//                         <CardHeader>
//                             <div className="flex items-center justify-between">
//                                 <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
//                                 <div className="flex gap-1">
//                                     <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}><ChevronLeft className="w-4 h-4" /></Button>
//                                     <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}><ChevronRight className="w-4 h-4" /></Button>
//                                 </div>
//                             </div>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs text-gray-500 font-medium">
//                                 {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d}>{d}</div>)}
//                             </div>
//                             <div className="grid grid-cols-7 gap-1">
//                                 {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
//                                 {days.map(day => <button key={day} onClick={() => { setSelectedDate(day); setIsEventModalOpen(true); }} className={`p-2 text-sm rounded-full hover:bg-blue-100 ${selectedDate === day ? 'bg-blue-500 text-white' : ''}`}>{day}</button>)}
//                             </div>
//                         </CardContent>
//                     </Card>
//                     <Button className="w-full" onClick={() => { setSelectedDate(new Date().getDate()); setIsEventModalOpen(true); }}><Plus className="w-4 h-4 mr-2"/>Add Calendar Event</Button>
                    
//                     <Card>
//                         <CardHeader><CardTitle>Working Hours</CardTitle></CardHeader>
//                         <CardContent className="space-y-2 text-sm">
//                             <div className="flex justify-between"><span className="text-gray-600">MWR</span><span className="font-medium">08:00 - 16:50</span></div>
//                             <div className="flex justify-between"><span className="text-gray-600">EDV</span><span className="font-medium">08:00 - 16:50</span></div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardHeader><CardTitle>Employee by Gender</CardTitle></CardHeader>
//                         <CardContent className="flex flex-col items-center">
//                             <div className="relative w-32 h-32">
//                                 <svg className="w-full h-full" viewBox="0 0 36 36">
//                                     <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fecaca" strokeWidth="3" />
//                                     <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="60, 100" />
//                                 </svg>
//                                 <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{stats.totalEmployee}</div>
//                             </div>
//                             <div className="w-full mt-4 space-y-2 text-sm">
//                                 <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400"></span>Male</div><span className="font-medium">60%</span></div>
//                                 <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-300"></span>Female</div><span className="font-medium">40%</span></div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>

//             {/* ================================== */}
//             {/* MODAL ADD EVENT YANG DIPERBAIKI */}
//             {/* ================================== */}
//             <Dialog 
//                 open={isEventModalOpen} 
//                 onClose={() => setIsEventModalOpen(false)} 
//                 title="Add New Event" 
//                 description={`Create a new event for ${selectedDate ? format(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate), 'dd MMMM yyyy') : 'selected date'}`}
//             >
//                 <div className="space-y-4 mt-4">
//                     <div>
//                         <label htmlFor="event-title" className="text-sm font-medium text-gray-700">Event Title</label>
//                         <input 
//                             id="event-title"
//                             placeholder="Enter event title..." 
//                             value={newEventTitle} 
//                             onChange={e => setNewEventTitle(e.target.value)} 
//                             className="w-full p-2 mt-1 border rounded-md"
//                         />
//                     </div>
//                      <div>
//                         <label htmlFor="event-date" className="text-sm font-medium text-gray-700">Date</label>
//                         <input 
//                             id="event-date"
//                             type="text"
//                             value={selectedDate ? format(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate), 'yyyy-MM-dd') : ''}
//                             readOnly
//                             className="w-full p-2 mt-1 border rounded-md bg-gray-100"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="event-description" className="text-sm font-medium text-gray-700">Description</label>
//                          <textarea 
//                             id="event-description"
//                             placeholder="Event description (optional)..." 
//                             value={newEventDescription}
//                             onChange={e => setNewEventDescription(e.target.value)}
//                             className="w-full p-2 mt-1 border rounded-md min-h-[100px]"
//                         />
//                     </div>
//                     <Button className="w-full" onClick={handleAddEvent}>Add Event</Button>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default DashboardPage;

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