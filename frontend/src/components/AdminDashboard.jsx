// // src/components/AdminDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminDashboard = () => {
//     const navigate = useNavigate();
    
//     // State untuk data user yang sedang login
//     const [adminUser, setAdminUser] = useState(null);

//     // State untuk form tambah user baru
//     const [nik, setNik] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');

//     // State untuk UI
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Ambil data user dari localStorage
//         const userData = localStorage.getItem('user');
//         if (userData) {
//             setAdminUser(JSON.parse(userData));
//         } else {
//             // Jika tidak ada data, tendang ke halaman login
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleAddUser = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage('');
//         setError('');

//         const token = localStorage.getItem('authToken');
//         if (!token) {
//             setError("Sesi Anda telah berakhir. Silakan login kembali.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'http://localhost:3000/api/users/add',
//                 { nik, name, password, role: 'employee' },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//             setMessage(response.data.message);
//             // Kosongkan form setelah berhasil
//             setNik('');
//             setName('');
//             setPassword('');
//         } catch (err) {
//             setError(err.response?.data?.message || "Gagal menambahkan user.");
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     const handleLogout = () => {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     if (!adminUser) {
//         return <div>Loading...</div>; // Atau tampilkan spinner
//     }

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Header */}
//             <header className="bg-white shadow">
//                 <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-gray-900">
//                         Admin Dashboard
//                     </h1>
//                     <div className="flex items-center">
//                          <span className="text-gray-600 mr-4">Welcome, {adminUser.name}!</span>
//                          <button
//                             onClick={handleLogout}
//                             className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
//                          >
//                             Logout
//                          </button>
//                     </div>
//                 </div>
//             </header>

//             {/* Konten Utama */}
//             <main>
//                 <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//                     <div className="px-4 py-6 sm:px-0">
//                         <div className="bg-white p-8 rounded-lg shadow-md">
//                             <h2 className="text-xl font-bold mb-6 text-gray-800">Tambah Karyawan Baru</h2>
//                             <form onSubmit={handleAddUser} className="space-y-4">
//                                 <div>
//                                     <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
//                                     <input
//                                         type="text"
//                                         id="nik"
//                                         value={nik}
//                                         onChange={(e) => setNik(e.target.value)}
//                                         required
//                                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
//                                     <input
//                                         type="text"
//                                         id="name"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         required
//                                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password Sementara</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     />
//                                 </div>
                                
//                                 {message && <p className="text-sm text-green-600">{message}</p>}
//                                 {error && <p className="text-sm text-red-600">{error}</p>}

//                                 <div className="flex justify-end">
//                                     <button
//                                         type="submit"
//                                         disabled={loading}
//                                         className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//                                     >
//                                         {loading ? 'Menambahkan...' : 'Tambah User'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react"
import { Bell, Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { ScrollArea } from "../components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { supabase } from "../lib/supabase"

export default function AdminDashboard() {
  const [attendanceData, setAttendanceData] = useState([])
  const [leaveRequests, setLeaveRequests] = useState([])
  const [calendarEvents, setCalendarEvents] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    event_type: 'meeting'
  })

  useEffect(() => {
    fetchDashboardData()
    
    // Set up real-time subscriptions
    const attendanceSubscription = supabase
      .channel('attendance_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' }, () => {
        fetchAttendanceData()
      })
      .subscribe()

    const leaveSubscription = supabase
      .channel('leave_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leave_requests' }, () => {
        fetchLeaveRequests()
      })
      .subscribe()

    const calendarSubscription = supabase
      .channel('calendar_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'calendar_events' }, () => {
        fetchCalendarEvents()
      })
      .subscribe()

    return () => {
      attendanceSubscription.unsubscribe()
      leaveSubscription.unsubscribe()
      calendarSubscription.unsubscribe()
    }
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    await Promise.all([
      fetchAttendanceData(),
      fetchLeaveRequests(),
      fetchCalendarEvents(),
      fetchNotifications()
    ])
    setLoading(false)
  }

  const fetchAttendanceData = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        users (id, full_name, department, position, profile_photo)
      `)
      .eq('date', new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching attendance:', error)
    } else {
      setAttendanceData(data || [])
    }
  }

  const fetchLeaveRequests = async () => {
    const { data, error } = await supabase
      .from('leave_requests')
      .select(`
        *,
        users (id, full_name, department, position, profile_photo)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leave requests:', error)
    } else {
      setLeaveRequests(data || [])
    }
  }

  const fetchCalendarEvents = async () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .gte('start_date', today.toISOString())
      .lte('start_date', nextWeek.toISOString())
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error fetching calendar events:', error)
    } else {
      setCalendarEvents(data || [])
    }
  }

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', '550e8400-e29b-41d4-a716-446655440000') // Admin user ID
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Error fetching notifications:', error)
    } else {
      setNotifications(data || [])
    }
  }

  const handleAttendanceApproval = async (attendanceId, status) => {
    const { error } = await supabase
      .from('attendance')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', attendanceId)

    if (error) {
      alert('Failed to update attendance status')
    } else {
      alert(`Attendance ${status} successfully`)
      fetchAttendanceData()
    }
  }

  const handleLeaveApproval = async (leaveId, status) => {
    const { error } = await supabase
      .from('leave_requests')
      .update({ 
        status, 
        approved_by: '550e8400-e29b-41d4-a716-446655440000', // Admin user ID
        approved_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', leaveId)

    if (error) {
      alert('Failed to update leave request')
    } else {
      alert(`Leave request ${status} successfully`)
      fetchLeaveRequests()
    }
  }

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.start_date || !newEvent.end_date) {
      alert('Please fill in all required fields')
      return
    }

    const { error } = await supabase
      .from('calendar_events')
      .insert([{
        ...newEvent,
        created_by: '550e8400-e29b-41d4-a716-446655440000' // Admin user ID
      }])

    if (error) {
      alert('Failed to add calendar event')
    } else {
      alert('Calendar event added successfully')
      setNewEvent({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        event_type: 'meeting'
      })
      fetchCalendarEvents()
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <Badge variant="default" className="bg-green-500">Present</Badge>
      case 'late':
        return <Badge variant="secondary" className="bg-yellow-500">Late</Badge>
      case 'pending':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Pending</Badge>
      case 'approved':
        return <Badge variant="default" className="bg-green-500">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getEventTypeBadge = (type) => {
    const colors = {
      meeting: 'bg-blue-500',
      deadline: 'bg-red-500',
      holiday: 'bg-green-500',
      training: 'bg-purple-500'
    }
    return <Badge className={colors[type] || 'bg-gray-500'}>{type}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Selamat datang kembali, Admin! Berikut adalah ringkasan hari ini.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Karyawan Hadir</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.filter(a => a.status === 'present').length}</div>
            <p className="text-xs text-muted-foreground">dari {attendanceData.length} karyawan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.filter(a => a.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">memerlukan persetujuan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengajuan Cuti</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveRequests.length}</div>
            <p className="text-xs text-muted-foreground">menunggu persetujuan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifikasi</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">belum dibaca</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Attendance Today */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Absensi Hari Ini</CardTitle>
            <CardDescription>Daftar kehadiran karyawan hari ini</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {attendanceData.map((attendance) => (
                  <div key={attendance.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={attendance.users.profile_photo || "/placeholder.svg?height=40&width=40"} />
                        <AvatarFallback>{attendance.users.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{attendance.users.full_name}</p>
                        <p className="text-xs text-muted-foreground">{attendance.users.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm">{attendance.check_in || 'Belum check-in'}</p>
                        <p className="text-xs text-muted-foreground">{attendance.check_out || 'Belum check-out'}</p>
                      </div>
                      {getStatusBadge(attendance.status)}
                      {attendance.status === 'pending' && (
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleAttendanceApproval(attendance.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleAttendanceApproval(attendance.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
            <CardDescription>Pemberitahuan terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {notification.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                      {notification.type === 'info' && <Bell className="h-5 w-5 text-blue-500" />}
                      {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {notification.type === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.created_at).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pengajuan Cuti</CardTitle>
            <CardDescription>Permintaan cuti yang menunggu persetujuan</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={request.users.profile_photo || "/placeholder.svg?height=32&width=32"} />
                          <AvatarFallback>{request.users.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{request.users.full_name}</p>
                          <p className="text-xs text-muted-foreground">{request.users.department}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{request.leave_type}</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Tanggal:</span> {new Date(request.start_date).toLocaleDateString('id-ID')} - {new Date(request.end_date).toLocaleDateString('id-ID')}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Alasan:</span> {request.reason}
                      </p>
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleLeaveApproval(request.id, 'approved')}
                          className="flex-1"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Setujui
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLeaveApproval(request.id, 'rejected')}
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Tolak
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Calendar Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Agenda Kalender</CardTitle>
              <CardDescription>Event mendatang minggu ini</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Tambah Event</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Event Baru</DialogTitle>
                  <DialogDescription>Buat agenda baru untuk kalender</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Event</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Masukkan judul event"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Masukkan deskripsi event"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Tanggal Mulai</Label>
                      <Input
                        id="start_date"
                        type="datetime-local"
                        value={newEvent.start_date}
                        onChange={(e) => setNewEvent({...newEvent, start_date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_date">Tanggal Selesai</Label>
                      <Input
                        id="end_date"
                        type="datetime-local"
                        value={newEvent.end_date}
                        onChange={(e) => setNewEvent({...newEvent, end_date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="event_type">Tipe Event</Label>
                    <Select value={newEvent.event_type} onValueChange={(value) => setNewEvent({...newEvent, event_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="holiday">Holiday</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEvent}>Tambah Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {calendarEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      {getEventTypeBadge(event.event_type)}
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.start_date).toLocaleString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
