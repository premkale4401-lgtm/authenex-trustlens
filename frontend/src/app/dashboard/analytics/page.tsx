// frontend/src/app/dashboard/page.tsx (Main Dashboard Overview)
"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Shield, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  FileText,
  Image as ImageIcon,
  Video,
  MoreHorizontal,
  ArrowUpRight,
  Filter
} from "lucide-react";
import Link from "next/link";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

const stats = [
  {
    title: "Total Analyses",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20"
  },
  {
    title: "Authentic Content",
    value: "892",
    change: "+8.2%",
    trend: "up",
    icon: CheckCircle2,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20"
  },
  {
    title: "Manipulated Detected",
    value: "312",
    change: "+24.1%",
    trend: "up",
    icon: AlertTriangle,
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20"
  },
  {
    title: "Pending Review",
    value: "80",
    change: "-5.4%",
    trend: "down",
    icon: Clock,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20"
  }
];

const activityData = [
  { name: "Mon", analyses: 45, authentic: 32, manipulated: 13 },
  { name: "Tue", analyses: 52, authentic: 38, manipulated: 14 },
  { name: "Wed", analyses: 48, authentic: 35, manipulated: 13 },
  { name: "Thu", analyses: 61, authentic: 42, manipulated: 19 },
  { name: "Fri", analyses: 55, authentic: 40, manipulated: 15 },
  { name: "Sat", analyses: 38, authentic: 28, manipulated: 10 },
  { name: "Sun", analyses: 42, authentic: 31, manipulated: 11 },
];

const contentTypeData = [
  { name: "Images", value: 65, color: "#0ea5e9" },
  { name: "Videos", value: 25, color: "#6366f1" },
  { name: "Documents", value: 10, color: "#8b5cf6" },
];

const recentCases = [
  { id: "CASE-2045", type: "image", title: "Social Media Verification", status: "completed", result: "authentic", time: "2 min ago", confidence: 98 },
  { id: "CASE-2044", type: "video", title: "News Footage Analysis", status: "processing", result: null, time: "15 min ago", confidence: null },
  { id: "CASE-2043", type: "image", title: "Legal Evidence Review", status: "completed", result: "manipulated", time: "1 hour ago", confidence: 94 },
  { id: "CASE-2042", type: "document", title: "Contract Authenticity", status: "completed", result: "authentic", time: "3 hours ago", confidence: 99 },
  { id: "CASE-2041", type: "video", title: "Surveillance Footage", status: "pending", result: null, time: "5 hours ago", confidence: null },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics Overview</h1>
          <p className="text-slate-400 mt-1">Welcome back, here's what's happening with your forensic analyses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>Last 7 Days</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl border ${stat.borderColor} bg-slate-900/50 backdrop-blur-sm p-6 group hover:bg-slate-800/50 transition-all duration-300`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`} />
            
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ color: 'inherit' }} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-slate-400 text-sm mt-1">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Analysis Activity</h3>
              <p className="text-sm text-slate-400">Weekly breakdown of forensic analyses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-500" />
                <span className="text-sm text-slate-400">Total</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-400">Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-sm text-slate-400">Manipulated</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAuthentic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="analyses" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorAnalyses)" />
                <Area type="monotone" dataKey="authentic" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAuthentic)" />
                <Area type="monotone" dataKey="manipulated" stroke="#f43f5e" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Content Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Content Distribution</h3>
          <p className="text-sm text-slate-400 mb-6">Breakdown by media type</p>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 mt-4">
            {contentTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-300">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Cases Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Cases</h3>
            <p className="text-sm text-slate-400">Latest forensic analyses and their status</p>
          </div>
          <Link 
            href="/dashboard/cases" 
            className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Case ID</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Result</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Time</th>
                <th className="text-right py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {recentCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm text-sky-400">{caseItem.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {caseItem.type === 'image' && <ImageIcon className="w-4 h-4 text-purple-400" />}
                      {caseItem.type === 'video' && <Video className="w-4 h-4 text-rose-400" />}
                      {caseItem.type === 'document' && <FileText className="w-4 h-4 text-amber-400" />}
                      <span className="text-sm text-slate-300 capitalize">{caseItem.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-white font-medium">{caseItem.title}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      caseItem.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      caseItem.status === 'processing' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20 animate-pulse' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        caseItem.status === 'completed' ? 'bg-emerald-400' :
                        caseItem.status === 'processing' ? 'bg-sky-400' :
                        'bg-amber-400'
                      }`} />
                      {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {caseItem.result ? (
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                        caseItem.result === 'authentic' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {caseItem.result === 'authentic' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        {caseItem.result === 'authentic' ? 'Authentic' : 'Manipulated'}
                        {caseItem.confidence && (
                          <span className="text-slate-500 text-xs">({caseItem.confidence}%)</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-sm">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-400">{caseItem.time}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Image Analysis", desc: "Verify image authenticity", icon: ImageIcon, color: "sky", href: "/dashboard/analyze?type=image" },
          { title: "Video Forensics", desc: "Detect deepfakes & edits", icon: Video, color: "indigo", href: "/dashboard/analyze?type=video" },
          { title: "Document Check", desc: "Validate document integrity", icon: FileText, color: "amber", href: "/dashboard/analyze?type=document" },
          { title: "Batch Processing", desc: "Analyze multiple files", icon: Shield, color: "emerald", href: "/dashboard/analyze?type=batch" },
        ].map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <Link
              href={action.href}
              className="block p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-700 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-${action.color}-500/10 border border-${action.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-6 h-6 text-${action.color}-400`} />
              </div>
              <h4 className="text-white font-semibold mb-1">{action.title}</h4>
              <p className="text-sm text-slate-400">{action.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}