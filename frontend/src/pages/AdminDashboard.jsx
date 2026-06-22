import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Search, LogOut } from 'lucide-react';
import api from '../api/axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    try {
      const response = await api.get('/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchSubmissions();
  }, [navigate]);



  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await api.delete(`/submissions/${id}`);
        fetchSubmissions(); // Refresh list
      } catch (error) {
        console.error('Error deleting submission', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const getAreaOfInterestData = () => {
    const counts = {};
    submissions.forEach(sub => {
      const area = sub.areaOfInterest || 'Unknown';
      counts[area] = (counts[area] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const getStateData = () => {
    const counts = {};
    submissions.forEach(sub => {
      const state = sub.state || 'Unknown';
      counts[state] = (counts[state] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const areaColors = ['#ff0000', '#cc0000', '#990000', '#660000', '#ff4d4d'];

  const filteredSubmissions = submissions.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.areaOfInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-shecanDark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center text-gray-400 hover:text-white transition-colors bg-[#1a1a1a] px-4 py-2 rounded border border-gray-800">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
            <div className="text-gray-400 mb-2 font-medium">Total Submissions</div>
            <div className="text-5xl font-extrabold text-shecanRed">{submissions.length}</div>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 md:col-span-2 flex items-center">
             <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by name, email, or area of interest..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111] border border-gray-700 rounded-lg pl-12 pr-4 py-4 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors"
              />
            </div>
          </div>
        </div>

        {submissions.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Submissions by Area of Interest</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={getAreaOfInterestData()} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {getAreaOfInterestData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={areaColors[index % areaColors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Submissions by State</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getStateData()}>
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" allowDecimals={false} />
                    <RechartsTooltip cursor={{ fill: '#222' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                    <Bar dataKey="value" fill="#ff0000" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
               <svg className="animate-spin h-8 w-8 text-shecanRed mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              Loading submissions...
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No submissions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-[#111] text-gray-400 uppercase text-xs tracking-wider border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Contact Info</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Area of Interest</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-[#111] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(sub.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{sub.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white mb-1">{sub.email}</div>
                        <div className="text-xs text-gray-500">{sub.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{sub.city || '-'}</div>
                        <div className="text-xs text-gray-500">{sub.state || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-shecanRed/10 text-shecanRed px-3 py-1 rounded-full text-xs border border-shecanRed/20 font-medium tracking-wide">
                          {sub.areaOfInterest}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleDelete(sub._id)} className="text-gray-500 hover:text-shecanRed transition-colors p-2 hover:bg-red-900/20 rounded-full" title="Delete Submission">
                          <Trash2 className="w-5 h-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
