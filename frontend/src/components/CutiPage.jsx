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
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDocuments, setModalDocuments] = useState([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');

  const API_URL = 'http://localhost:3000/api';
  
  // Fungsi untuk mendapatkan header otorisasi
  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchLeaveRequests = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search: searchTerm, status: statusFilter, department: departmentFilter });
      const res = await axios.get(`${API_URL}/leave-requests?${params.toString()}`, getAuthHeaders());
      setRequests(res.data);
    } catch (error) { 
      console.error("Gagal mengambil data cuti:", error); 
      setError('Gagal mengambil data pengajuan cuti. Silakan refresh halaman.');
    } finally { 
      setLoading(false); 
    }
  }, [searchTerm, statusFilter, departmentFilter]);

  useEffect(() => {
    // Debounce untuk fetching data saat filter berubah
    const handler = setTimeout(() => { 
      if (activeTab === 'requests') {
        fetchLeaveRequests();
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [fetchLeaveRequests, activeTab]);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError('');
      try {
        const [statsRes, quotasRes, analyticsRes] = await Promise.all([
          axios.get(`${API_URL}/cuti/stats`, getAuthHeaders()), // <-- Endpoint diubah
          axios.get(`${API_URL}/employee-quotas`, getAuthHeaders()),
          axios.get(`${API_URL}/analytics`, getAuthHeaders())
        ]);
        setStats(statsRes.data);
        setQuotas(quotasRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) { 
        console.error("Gagal mengambil data awal:", error); 
        setError('Gagal memuat data halaman cuti. Pastikan Anda sudah login dan backend berjalan.');
      } finally {
        setLoading(false);
      }
    };
    
    // Panggil data awal hanya sekali
    if (activeTab !== 'requests') {
      setLoading(true);
      fetchInitialData().finally(() => setLoading(false));
    } else {
        fetchInitialData(); // biarkan loading di-handle oleh fetchLeaveRequests
    }

  }, [activeTab]);

  const handleUpdateRequest = async (id, status) => {
    try {
      await axios.put(`${API_URL}/leave-requests/${id}`, { status }, getAuthHeaders());
      fetchLeaveRequests(); // Ambil ulang data setelah update
    } catch (error) { 
      console.error("Gagal update status:", error); 
      setError('Gagal memperbarui status cuti.');
    }
  };

  const handleOpenDocuments = async (requestId, employeeName) => {
    try {
        const res = await axios.get(`${API_URL}/leave-requests/${requestId}/documents`, getAuthHeaders());
        setModalDocuments(res.data);
        setSelectedEmployeeName(employeeName);
        setIsModalOpen(true);
    } catch(error) { 
      console.error("Gagal mengambil dokumen:", error); 
      setError('Gagal mengambil dokumen pendukung.');
    }
  };

  if (error) {
    return <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">{error}</div>;
  }
  
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
          {loading && <p className="text-center p-4">Loading data...</p>}
          {!loading && activeTab === 'requests' && (
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
              <LeaveRequestsTable requests={requests} onUpdate={handleUpdateRequest} onOpenDocs={handleOpenDocuments} />
            </div>
          )}
          {!loading && activeTab === 'quotas' && <EmployeeQuotasTable quotas={quotas} />}
          {!loading && activeTab === 'analytics' && <AnalyticsView data={analytics} />}
        </div>
      </div>
    </div>
  );
};

// Komponen Tabel Permintaan Cuti
const LeaveRequestsTable = ({ requests }) => (
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
    {requests.length === 0 && <p className="text-center p-4 text-gray-500">No requests match the current filters.</p>}
  </div>
);

// Komponen lainnya
const EmployeeQuotasTable = ({ quotas }) => ( <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="text-gray-500"><th className="p-2">Employee</th><th className="p-2">Department</th><th className="p-2">Total Quota</th><th className="p-2">Used</th><th className="p-2">Remaining</th><th className="p-2 w-1/4">Usage %</th><th className="p-2">Status</th></tr></thead><tbody>{quotas.map(q => {const remaining = q.total_quota - q.used_quota;const percentage = q.total_quota > 0 ? Math.round((q.used_quota / q.total_quota) * 100) : 0;const isAvailable = remaining > 0;return (<tr key={q.name} className="border-t"><td className="p-2 font-semibold">{q.name}</td><td className="p-2">{q.department}</td><td className="p-2">{q.total_quota} days</td><td className="p-2">{q.used_quota} days</td><td className="p-2 font-bold">{remaining} days</td><td className="p-2"><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div></div></td><td className={`p-2 font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>{isAvailable ? 'Available' : 'Unavailable'}</td></tr>);})}</tbody></table></div> );
const AnalyticsView = ({ data }) => ( <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div><h3 className="font-bold mb-4">Leave Types Distribution</h3><div style={{ width: '100%', height: 300 }}><ResponsiveContainer><BarChart data={data.leaveTypes} layout="vertical" margin={{ left: 30 }}><XAxis type="number" /><YAxis dataKey="leave_type" type="category" width={100} /><Tooltip /><Bar dataKey="count" fill="#3b82f6" name="Total"/></BarChart></ResponsiveContainer></div></div><div><h3 className="font-bold mb-4">Monthly Leave Trends</h3><div style={{ width: '100%', height: 300 }}><ResponsiveContainer><BarChart data={data.monthlyTrends}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#84cc16" name="Requests"/></BarChart></ResponsiveContainer></div></div></div> );

export default CutiPage;