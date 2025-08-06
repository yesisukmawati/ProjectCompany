// // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // import axios from 'axios';
// // import { format } from 'date-fns';
// // import { Search, Download, CheckCircle, XCircle, Calendar, Clock, TrendingUp } from 'lucide-react';

// // // ==================================
// // // Komponen UI
// // // ==================================
// // const StatCard = ({ title, value, icon, color }) => (
// //     <div className={`rounded-xl shadow p-4 text-white ${color}`}>
// //         <div className="flex items-center justify-between">
// //             <div>
// //                 <p className="text-sm opacity-90">{title}</p>
// //                 <p className="text-3xl font-bold">{value}</p>
// //             </div>
// //             <div className="opacity-50">{icon}</div>
// //         </div>
// //     </div>
// // );

// // const Badge = ({ status }) => {
// //     const styles = {
// //         Pending: "bg-yellow-100 text-yellow-800",
// //         Approved: "bg-green-100 text-green-800",
// //         Rejected: "bg-red-100 text-red-800",
// //         Available: "bg-green-100 text-green-800",
// //         Exhausted: "bg-red-100 text-red-800",
// //         default: "bg-gray-100 text-gray-700",
// //     };
// //     const style = styles[status] || styles.default;
// //     return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${style}`}>{status}</span>;
// // };

// // const ProgressBar = ({ value }) => (
// //     <div className="w-full bg-gray-200 rounded-full h-2">
// //         <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
// //     </div>
// // );

// // // ==================================
// // // Komponen Tab
// // // ==================================
// // const LeaveRequestsTab = ({ requests, onUpdate, filters, setFilters }) => (
// //     <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
// //         <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
// //             <h3 className="font-semibold text-lg">Leave Requests</h3>
// //             <div className="flex items-center gap-2">
// //                 <div className="relative w-64">
// //                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                     <input 
// //                         placeholder="Search employees..." 
// //                         className="pl-10 w-full p-2 border rounded-md"
// //                         value={filters.searchTerm}
// //                         onChange={e => setFilters({...filters, searchTerm: e.target.value})}
// //                     />
// //                 </div>
// //                 <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} className="p-2 border rounded-md bg-white">
// //                     {["All", "Pending", "Approved", "Rejected"].map(s => <option key={s} value={s}>{s}</option>)}
// //                 </select>
// //                 <button className="flex items-center text-sm px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
// //                     <Download className="w-4 h-4 mr-2" />Export
// //                 </button>
// //             </div>
// //         </div>
// //         <div className="overflow-x-auto">
// //             <table className="w-full">
// //                 <thead><tr className="text-left text-xs text-gray-500 uppercase border-b"><th className="p-3">Employee</th><th className="p-3">Type</th><th className="p-3">Duration</th><th className="p-3">Days</th><th className="p-3">Status</th><th className="p-3 text-center">Actions</th></tr></thead>
// //                 <tbody className="text-sm">
// //                     {requests.length > 0 ? requests.map(req => (
// //                         <tr key={req.id} className="border-b">
// //                             <td className="p-3 font-medium">{req.users?.name || 'N/A'}</td>
// //                             <td className="p-3"><Badge status="default">{req.reason || 'Annual Leave'}</Badge></td>
// //                             <td className="p-3">{format(new Date(req.start_date), 'dd MMM')} - {format(new Date(req.end_date), 'dd MMM yyyy')}</td>
// //                             <td className="p-3">{Math.ceil((new Date(req.end_date) - new Date(req.start_date)) / (1000*60*60*24)) + 1}</td>
// //                             <td className="p-3"><Badge status={req.status} /></td>
// //                             <td className="p-3">
// //                                 {req.status === 'Pending' && (
// //                                     <div className="flex justify-center gap-2">
// //                                         <button onClick={() => onUpdate(req.id, 'Approved')} className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 flex items-center"><CheckCircle className="w-3 h-3 mr-1"/>Approve</button>
// //                                         <button onClick={() => onUpdate(req.id, 'Rejected')} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 flex items-center"><XCircle className="w-3 h-3 mr-1"/>Reject</button>
// //                                     </div>
// //                                 )}
// //                             </td>
// //                         </tr>
// //                     )) : <tr><td colSpan="6" className="text-center p-8 text-gray-500">No matching requests found.</td></tr>}
// //                 </tbody>
// //             </table>
// //         </div>
// //     </div>
// // );

// // const EmployeeQuotasTab = ({ quotas }) => (
// //      <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
// //         <h3 className="font-semibold text-lg mb-4">Employee Leave Quotas</h3>
// //         <div className="overflow-x-auto">
// //             <table className="w-full">
// //                 <thead><tr className="text-left text-xs text-gray-500 uppercase border-b"><th className="p-3">Employee</th><th className="p-3">Department</th><th className="p-3">Total</th><th className="p-3">Used</th><th className="p-3">Remaining</th><th className="p-3">Usage %</th><th className="p-3">Status</th></tr></thead>
// //                 <tbody className="text-sm">
// //                     {quotas.map(q => {
// //                         const remaining = q.total_quota - q.used_quota;
// //                         const usage = q.total_quota > 0 ? Math.round((q.used_quota / q.total_quota) * 100) : 0;
// //                         return (
// //                             <tr key={q.id} className="border-b">
// //                                 <td className="p-3 font-medium">{q.users?.name || 'N/A'}</td>
// //                                 <td className="p-3">{q.users?.department || 'N/A'}</td>
// //                                 <td className="p-3">{q.total_quota} days</td>
// //                                 <td className="p-3">{q.used_quota} days</td>
// //                                 <td className={`p-3 font-bold ${remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>{remaining} days</td>
// //                                 <td className="p-3"><div className="flex items-center gap-2 w-24"><ProgressBar value={usage} /><span>{usage}%</span></div></td>
// //                                 <td className="p-3"><Badge status={remaining > 0 ? 'Available' : 'Exhausted'} /></td>
// //                             </tr>
// //                         );
// //                     })}
// //                 </tbody>
// //             </table>
// //         </div>
// //     </div>
// // );

// // const AnalyticsTab = () => (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// //         <div className="bg-white p-6 rounded-lg shadow-sm"><h3 className="font-semibold mb-4">Leave Types Distribution</h3></div>
// //         <div className="bg-white p-6 rounded-lg shadow-sm"><h3 className="font-semibold mb-4">Monthly Leave Trends</h3></div>
// //     </div>
// // );

// // // ==================================
// // // Komponen Utama Halaman Cuti
// // // ==================================
// // const CutiPage = () => {
// //     const [activeTab, setActiveTab] = useState('Leave Requests');
// //     const [stats, setStats] = useState(null);
// //     const [leaveRequests, setLeaveRequests] = useState([]);
// //     const [employeeQuotas, setEmployeeQuotas] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const [filters, setFilters] = useState({ searchTerm: "", status: "All" });

// //     const fetchData = useCallback(async () => {
// //         // Jangan set loading di sini agar tidak berkedip saat update
// //         try {
// //             const token = localStorage.getItem('authToken');
// //             if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
// //             const config = { headers: { Authorization: `Bearer ${token}` } };
            
// //             const [statsRes, requestsRes, quotasRes] = await Promise.all([
// //                 axios.get('http://localhost:3000/api/cuti/stats', config),
// //                 axios.get('http://localhost:3000/api/cuti/requests', config),
// //                 axios.get('http://localhost:3000/api/quotas', config)
// //             ]);
            
// //             setStats(statsRes.data);
// //             setLeaveRequests(requestsRes.data);
// //             setEmployeeQuotas(quotasRes.data);
// //         } catch (err) {
// //             setError(err.response?.data?.message || err.message || "Gagal memuat data.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         fetchData();
// //     }, [fetchData]);

// //     const handleUpdateStatus = async (id, status) => {
// //         try {
// //             const token = localStorage.getItem('authToken');
// //             await axios.put(`http://localhost:3000/api/cuti/requests/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
// //             fetchData();
// //         } catch (error) {
// //             alert('Gagal memperbarui status cuti.');
// //         }
// //     };

// //     const filteredRequests = useMemo(() => 
// //         leaveRequests.filter(req => 
// //             (req.users?.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
// //             (filters.status === "All" || req.status === filters.status)
// //         ),
// //         [leaveRequests, filters]
// //     );

// //     if (loading) return <div className="p-6 text-center text-gray-500">Memuat data cuti...</div>;
// //     if (error) return <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg">{error}</div>;

// //     return (
// //         <div className="space-y-6">
// //             <div>
// //                 <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
// //                 <p className="text-gray-500">Manage employee leave requests and quotas</p>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 <StatCard title="Total Requests" value={stats?.totalRequests ?? 0} icon={<Calendar size={28}/>} color="bg-blue-500" />
// //                 <StatCard title="Pending" value={stats?.pending ?? 0} icon={<Clock size={28}/>} color="bg-yellow-500" />
// //                 <StatCard title="Approved" value={stats?.approved ?? 0} icon={<CheckCircle size={28}/>} color="bg-green-500" />
// //                 <StatCard title="Avg Processing" value={stats?.avgProcessing ?? 'N/A'} icon={<TrendingUp size={28}/>} color="bg-purple-500" />
// //             </div>

// //             <div className="border-b">
// //                 <nav className="-mb-px flex space-x-6">
// //                     <button onClick={() => setActiveTab('Leave Requests')} className={`py-2 px-1 border-b-2 ${activeTab === 'Leave Requests' ? 'border-slate-800 text-slate-800' : 'border-transparent text-gray-500 hover:text-slate-700'}`}>Leave Requests</button>
// //                     <button onClick={() => setActiveTab('Employee Quotas')} className={`py-2 px-1 border-b-2 ${activeTab === 'Employee Quotas' ? 'border-slate-800 text-slate-800' : 'border-transparent text-gray-500 hover:text-slate-700'}`}>Employee Quotas</button>
// //                     <button onClick={() => setActiveTab('Analytics')} className={`py-2 px-1 border-b-2 ${activeTab === 'Analytics' ? 'border-slate-800 text-slate-800' : 'border-transparent text-gray-500 hover:text-slate-700'}`}>Analytics</button>
// //                 </nav>
// //             </div>

// //             <div>
// //                 {activeTab === 'Leave Requests' && <LeaveRequestsTab requests={filteredRequests} onUpdate={handleUpdateStatus} filters={filters} setFilters={setFilters} />}
// //                 {activeTab === 'Employee Quotas' && <EmployeeQuotasTab quotas={employeeQuotas} />}
// //                 {activeTab === 'Analytics' && <AnalyticsTab />}
// //             </div>
// //         </div>
// //     );
// // };

// // export default CutiPage;
// // frontend/src/components/CutiPage.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Komponen Kartu Statistik
// const StatCard = ({ title, value, color, icon }) => (
//   <div className={`flex-1 p-6 rounded-lg text-white ${color}`}>
//     <p className="text-sm">{title}</p>
//     <div className="flex justify-between items-center">
//       <p className="text-3xl font-bold">{value}</p>
//       <span className="text-2xl">{icon}</span>
//     </div>
//   </div>
// );

// // Komponen Utama Halaman Cuti
// const CutiPage = () => {
//   const [activeTab, setActiveTab] = useState('requests');
//   const [stats, setStats] = useState({ totalRequests: 0, pending: 0, approved: 0, avgProcessing: 0 });
//   const [requests, setRequests] = useState([]);
//   const [quotas, setQuotas] = useState([]);
//   const [analytics, setAnalytics] = useState({ leaveTypes: [], monthlyTrends: [] });
//   const [loading, setLoading] = useState(true);

//   const API_URL = 'http://localhost:3001/api';

//   // Fungsi untuk mengambil semua data dari backend
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [statsRes, requestsRes, quotasRes, analyticsRes] = await Promise.all([
//         axios.get(`${API_URL}/dashboard-stats`),
//         axios.get(`${API_URL}/leave-requests`),
//         axios.get(`${API_URL}/employee-quotas`),
//         axios.get(`${API_URL}/analytics`)
//       ]);
//       setStats(statsRes.data);
//       setRequests(requestsRes.data);
//       setQuotas(quotasRes.data);
//       setAnalytics(analyticsRes.data);
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Fungsi untuk handle approve/reject
//   const handleUpdateRequest = async (id, status) => {
//     try {
//       await axios.put(`${API_URL}/leave-requests/${id}`, { status });
//       fetchData(); // Ambil data ulang untuk refresh
//     } catch (error) {
//       console.error("Gagal update status:", error);
//     }
//   };

//   if (loading) {
//     return <div className="text-center p-10">Memuat data...</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
//       <p className="text-gray-500 mb-6">Manage employee leave requests and quotas</p>

//       {/* Bagian Statistik Header */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatCard title="Total Requests" value={stats.totalRequests} color="bg-blue-500" icon="📋" />
//         <StatCard title="Pending" value={stats.pending} color="bg-yellow-500" icon="⏳" />
//         <StatCard title="Approved" value={stats.approved} color="bg-green-500" icon="✅" />
//         <StatCard title="Avg Processing" value={`${stats.avgProcessing} days`} color="bg-purple-500" icon="📈" />
//       </div>

//       {/* Bagian Tabulasi Konten */}
//       <div className="bg-white rounded-lg shadow-md">
//         <div className="border-b">
//           <nav className="flex space-x-2 p-2">
//             <TabButton label="Leave Requests" isActive={activeTab === 'requests'} onClick={() => setActiveTab('requests')} />
//             <TabButton label="Employee Quotas" isActive={activeTab === 'quotas'} onClick={() => setActiveTab('quotas')} />
//             <TabButton label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
//           </nav>
//         </div>
//         <div className="p-4">
//           {activeTab === 'requests' && <LeaveRequestsTable requests={requests} onUpdate={handleUpdateRequest} />}
//           {activeTab === 'quotas' && <EmployeeQuotasTable quotas={quotas} />}
//           {activeTab === 'analytics' && <AnalyticsView data={analytics} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Komponen Tombol Tab
// const TabButton = ({ label, isActive, onClick }) => (
//   <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
//     {label}
//   </button>
// );

// // === Komponen-komponen untuk setiap Tab ===

// const LeaveRequestsTable = ({ requests, onUpdate }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full text-left text-sm">
//       <thead>
//         <tr className="text-gray-500">
//           <th className="p-2">Employee</th>
//           <th className="p-2">Type</th>
//           <th className="p-2">Duration</th>
//           <th className="p-2">Days</th>
//           <th className="p-2">Status</th>
//           <th className="p-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {requests.map(req => (
//           <tr key={req.id} className="border-t">
//             <td className="p-2 font-semibold">{req.name}</td>
//             <td className="p-2">{req.leave_type}</td>
//             <td className="p-2">{new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}</td>
//             <td className="p-2">{req.days} days</td>
//             <td className="p-2">
//               <span className={`px-2 py-1 text-xs rounded-full ${req.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : req.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{req.status}</span>
//             </td>
//             <td className="p-2 flex gap-2">
//               {req.status === 'Pending' && (
//                 <>
//                   <button onClick={() => onUpdate(req.id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded text-xs">Approve</button>
//                   <button onClick={() => onUpdate(req.id, 'Rejected')} className="bg-red-500 text-white px-3 py-1 rounded text-xs">Reject</button>
//                 </>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const EmployeeQuotasTable = ({ quotas }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full text-left text-sm">
//       <thead>
//         <tr className="text-gray-500">
//           <th className="p-2">Employee</th>
//           <th className="p-2">Department</th>
//           <th className="p-2">Total Quota</th>
//           <th className="p-2">Used</th>
//           <th className="p-2">Remaining</th>
//           <th className="p-2 w-1/4">Usage %</th>
//           <th className="p-2">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {quotas.map(q => {
//           const remaining = q.total_quota - q.used_quota;
//           const percentage = q.total_quota > 0 ? Math.round((q.used_quota / q.total_quota) * 100) : 0;
//           const isAvailable = remaining > 0;
//           return (
//             <tr key={q.name} className="border-t">
//               <td className="p-2 font-semibold">{q.name}</td>
//               <td className="p-2">{q.department}</td>
//               <td className="p-2">{q.total_quota} days</td>
//               <td className="p-2">{q.used_quota} days</td>
//               <td className="p-2 font-bold">{remaining} days</td>
//               <td className="p-2">
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
//                 </div>
//               </td>
//               <td className={`p-2 font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>{isAvailable ? 'Available' : 'Unavailable'}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// );

// const AnalyticsView = ({ data }) => (
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//     <div>
//       <h3 className="font-bold mb-4">Leave Types Distribution</h3>
//       <div style={{ width: '100%', height: 300 }}>
//         <ResponsiveContainer>
//           <BarChart data={data.leaveTypes} layout="vertical" margin={{ left: 30 }}>
//             <XAxis type="number" />
//             <YAxis dataKey="leave_type" type="category" width={100} />
//             <Tooltip />
//             <Bar dataKey="count" fill="#3b82f6" name="Total"/>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//     <div>
//       <h3 className="font-bold mb-4">Monthly Leave Trends</h3>
//       <div style={{ width: '100%', height: 300 }}>
//         <ResponsiveContainer>
//           <BarChart data={data.monthlyTrends}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#84cc16" name="Requests"/>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   </div>
// );

// export default CutiPage;

// frontend/src/components/CutiPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Komponen Modal Dokumen
const DocumentModal = ({ isOpen, onClose, documents, employeeName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Documents</h3>
            <p className="text-sm text-gray-500">Files submitted by {employeeName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div className="space-y-2">
          {documents.length > 0 ? (
            documents.map(doc => (
              <div key={doc.id} className="border rounded-lg p-3 flex justify-between items-center">
                <span className="text-blue-600">📄 {doc.file_name}</span>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" download className="p-2 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No documents found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen Utama Halaman Cuti
const CutiPage = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [stats, setStats] = useState({ totalRequests: 0, pending: 0, approved: 0, avgProcessing: 0 });
  const [requests, setRequests] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [analytics, setAnalytics] = useState({ leaveTypes: [], monthlyTrends: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDocuments, setModalDocuments] = useState([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');

  const API_URL = 'http://localhost:3000/api';

  const fetchLeaveRequests = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search: searchTerm, status: statusFilter, department: departmentFilter });
      const res = await axios.get(`${API_URL}/leave-requests?${params.toString()}`);
      setRequests(res.data);
    } catch (error) { console.error("Gagal mengambil data cuti:", error); } 
    finally { setLoading(false); }
  }, [searchTerm, statusFilter, departmentFilter]);

  useEffect(() => {
    const handler = setTimeout(() => { if (activeTab === 'requests') fetchLeaveRequests(); }, 500);
    return () => clearTimeout(handler);
  }, [fetchLeaveRequests, activeTab]);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [statsRes, quotasRes, analyticsRes] = await Promise.all([
          axios.get(`${API_URL}/dashboard-stats`),
          axios.get(`${API_URL}/employee-quotas`),
          axios.get(`${API_URL}/analytics`)
        ]);
        setStats(statsRes.data);
        setQuotas(quotasRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) { console.error("Gagal mengambil data awal:", error); }
    };
    fetchInitialData();
  }, []);

  const handleUpdateRequest = async (id, status) => {
    try {
      await axios.put(`${API_URL}/leave-requests/${id}`, { status });
      fetchLeaveRequests();
    } catch (error) { console.error("Gagal update status:", error); }
  };

  const handleOpenDocuments = async (requestId, employeeName) => {
    try {
        const res = await axios.get(`${API_URL}/leave-requests/${requestId}/documents`);
        setModalDocuments(res.data);
        setSelectedEmployeeName(employeeName);
        setIsModalOpen(true);
    } catch(error) { console.error("Gagal mengambil dokumen:", error); }
  };
  
  return (
    <div>
      <DocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} documents={modalDocuments} employeeName={selectedEmployeeName} />
      <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
      <p className="text-gray-500 mb-6">Review and manage employee leave applications</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 rounded-lg text-white bg-blue-500"><p className="text-sm">Total Requests</p><p className="text-3xl font-bold">{stats.totalRequests}</p></div>
        <div className="p-6 rounded-lg text-white bg-yellow-500"><p className="text-sm">Pending</p><p className="text-3xl font-bold">{stats.pending}</p></div>
        <div className="p-6 rounded-lg text-white bg-green-500"><p className="text-sm">Approved</p><p className="text-3xl font-bold">{stats.approved}</p></div>
        <div className="p-6 rounded-lg text-white bg-purple-500"><p className="text-sm">Avg Processing</p><p className="text-3xl font-bold">{stats.avgProcessing} days</p></div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex space-x-2 p-2">
            <button onClick={() => setActiveTab('requests')} className={`px-4 py-2 text-sm font-semibold rounded-md ${activeTab === 'requests' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Leave Requests</button>
            <button onClick={() => setActiveTab('quotas')} className={`px-4 py-2 text-sm font-semibold rounded-md ${activeTab === 'quotas' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Employee Quotas</button>
            <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 text-sm font-semibold rounded-md ${activeTab === 'analytics' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>Analytics</button>
          </nav>
        </div>
        <div className="p-4">
          {activeTab === 'requests' && (
            <div>
              <div className="flex flex-wrap gap-4 mb-4">
                <input type="text" placeholder="Search employees..." onChange={(e) => setSearchTerm(e.target.value)} className="flex-grow p-2 border rounded-md"/>
                <select onChange={(e) => setDepartmentFilter(e.target.value)} className="p-2 border rounded-md bg-white">
                  <option value="All">All Departments</option><option value="Finance">Finance</option><option value="IT">IT</option><option value="Marketing">Marketing</option><option value="HR">HR</option>
                </select>
                <select onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded-md bg-white">
                  <option value="All">All Statuses</option><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option>
                </select>
              </div>
              {loading ? <p className="text-center p-4">Loading...</p> : <LeaveRequestsTable requests={requests} onUpdate={handleUpdateRequest} onOpenDocs={handleOpenDocuments} />}
            </div>
          )}
          {activeTab === 'quotas' && <EmployeeQuotasTable quotas={quotas} />}
          {activeTab === 'analytics' && <AnalyticsView data={analytics} />}
        </div>
      </div>
    </div>
  );
};

// Komponen Tabel Permintaan Cuti
const LeaveRequestsTable = ({ requests, onUpdate, onOpenDocs }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="text-gray-500 font-medium"><th className="p-2">Employee</th><th className="p-2">Type</th><th className="p-2">Duration</th><th className="p-2">Days</th><th className="p-2">Status</th><th className="p-2">Documents</th><th className="p-2">Actions</th></tr>
      </thead>
      <tbody>
        {requests.map(req => (
          <tr key={req.id} className="border-t">
            <td className="p-2 font-semibold">{req.name}<br/><span className="font-normal text-gray-500">{req.department}</span></td>
            <td className="p-2">{req.leave_type}</td>
            <td className="p-2">{new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}</td>
            <td className="p-2">{req.days} days</td>
            <td className="p-2"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : req.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{req.status}</span></td>
            <td className="p-2">
              {req.document_count > 0 ? <button onClick={() => onOpenDocs(req.id, req.name)} className="text-blue-600 hover:underline">{req.document_count} files</button> : <span className="text-gray-400">No documents</span>}
            </td>
            <td className="p-2 flex gap-2">
              {req.status === 'Pending' && (<><button onClick={() => onUpdate(req.id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">Approve</button><button onClick={() => onUpdate(req.id, 'Rejected')} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Reject</button></>)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {requests.length === 0 && !loading && <p className="text-center p-4 text-gray-500">No requests match the current filters.</p>}
  </div>
);

// Komponen lainnya (tidak berubah)
const EmployeeQuotasTable = ({ quotas }) => ( <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="text-gray-500"><th className="p-2">Employee</th><th className="p-2">Department</th><th className="p-2">Total Quota</th><th className="p-2">Used</th><th className="p-2">Remaining</th><th className="p-2 w-1/4">Usage %</th><th className="p-2">Status</th></tr></thead><tbody>{quotas.map(q => {const remaining = q.total_quota - q.used_quota;const percentage = q.total_quota > 0 ? Math.round((q.used_quota / q.total_quota) * 100) : 0;const isAvailable = remaining > 0;return (<tr key={q.name} className="border-t"><td className="p-2 font-semibold">{q.name}</td><td className="p-2">{q.department}</td><td className="p-2">{q.total_quota} days</td><td className="p-2">{q.used_quota} days</td><td className="p-2 font-bold">{remaining} days</td><td className="p-2"><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div></div></td><td className={`p-2 font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>{isAvailable ? 'Available' : 'Unavailable'}</td></tr>);})}</tbody></table></div> );
const AnalyticsView = ({ data }) => ( <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div><h3 className="font-bold mb-4">Leave Types Distribution</h3><div style={{ width: '100%', height: 300 }}><ResponsiveContainer><BarChart data={data.leaveTypes} layout="vertical" margin={{ left: 30 }}><XAxis type="number" /><YAxis dataKey="leave_type" type="category" width={100} /><Tooltip /><Bar dataKey="count" fill="#3b82f6" name="Total"/></BarChart></ResponsiveContainer></div></div><div><h3 className="font-bold mb-4">Monthly Leave Trends</h3><div style={{ width: '100%', height: 300 }}><ResponsiveContainer><BarChart data={data.monthlyTrends}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#84cc16" name="Requests"/></BarChart></ResponsiveContainer></div></div></div> );

export default CutiPage;