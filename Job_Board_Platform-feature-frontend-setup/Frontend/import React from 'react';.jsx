import React from 'react';
import { Home, User, Mail, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const jobListings = [
    { id: 1, company: "CloudNest Systems", role: "front end developer", logo: "❌" },
    { id: 2, company: "SterlingPath Ltd.", role: "software engineer", logo: "🚗" },
    { id: 3, company: "CodeSphere Inc.", role: "sales associate", logo: "🌿" },
    { id: 4, company: "CloudNest Systems", role: "IT support", logo: "❌" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black rounded-2xl flex items-center justify-center text-white text-xl">
            🐻
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Jobnest</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 border border-gray-200 rounded-full pl-11 py-3 focus:outline-none focus:border-gray-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white px-4 py-1 text-sm rounded-full border border-gray-200 text-gray-500">
              Database
            </div>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-7 text-gray-600">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors">
            <Home size={26} />
          </button>
          <button onClick={() => navigate('/profile')} className="hover:text-black transition-colors">
            <User size={26} />
          </button>
          <button onClick={() => navigate('/notifications')} className="hover:text-black transition-colors">
            <Mail size={26} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-10 w-fit mx-auto">
          <button className="px-10 py-3 bg-white rounded-full font-semibold shadow-sm">
            Job listed
          </button>
          <button className="px-10 py-3 text-gray-500 hover:text-gray-700 transition-all">
            Users list
          </button>
          <button className="px-10 py-3 text-gray-500 hover:text-gray-700 transition-all">
            company details
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 flex items-center gap-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                {job.logo}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{job.company}</h3>
                <p className="text-gray-500 mt-1 text-lg">{job.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;