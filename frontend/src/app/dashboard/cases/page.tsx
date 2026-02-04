// frontend/src/app/dashboard/cases/page.tsx (Cases Management)
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MoreVertical,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Image as ImageIcon,
  Video,
  FileText,
  Download,
  Share2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  FolderOpen,
  Shield,
  BarChart3
} from "lucide-react";
import Link from "next/link";

// Mock data for cases
const casesData = [
  { 
    id: "CASE-2045", 
    title: "Social Media Verification", 
    type: "image", 
    status: "completed", 
    result: "authentic", 
    date: "2024-01-15", 
    time: "2 hours ago",
    confidence: 98,
    size: "2.4 MB",
    tags: ["social media", "viral"],
    analyst: "John Doe"
  },
  { 
    id: "CASE-2044", 
    title: "News Footage Analysis", 
    type: "video", 
    status: "processing", 
    result: null, 
    date: "2024-01-15", 
    time: "5 hours ago",
    confidence: null,
    size: "156 MB",
    tags: ["news", "broadcast"],
    analyst: "Jane Smith"
  },
  { 
    id: "CASE-2043", 
    title: "Legal Evidence Review", 
    type: "image", 
    status: "completed", 
    result: "manipulated", 
    date: "2024-01-14", 
    time: "1 day ago",
    confidence: 94,
    size: "4.1 MB",
    tags: ["legal", "court"],
    analyst: "John Doe"
  },
  { 
    id: "CASE-2042", 
    title: "Contract Authenticity", 
    type: "document", 
    status: "completed", 
    result: "authentic", 
    date: "2024-01-14", 
    time: "1 day ago",
    confidence: 99,
    size: "1.2 MB",
    tags: ["business", "contract"],
    analyst: "Mike Johnson"
  },
  { 
    id: "CASE-2041", 
    title: "Surveillance Footage", 
    type: "video", 
    status: "pending", 
    result: null, 
    date: "2024-01-13", 
    time: "2 days ago",
    confidence: null,
    size: "890 MB",
    tags: ["security", "surveillance"],
    analyst: "Jane Smith"
  },
  { 
    id: "CASE-2040", 
    title: "Product Image Verification", 
    type: "image", 
    status: "completed", 
    result: "authentic", 
    date: "2024-01-13", 
    time: "2 days ago",
    confidence: 97,
    size: "3.5 MB",
    tags: ["e-commerce", "product"],
    analyst: "John Doe"
  },
  { 
    id: "CASE-2039", 
    title: "Political Speech Video", 
    type: "video", 
    status: "completed", 
    result: "manipulated", 
    date: "2024-01-12", 
    time: "3 days ago",
    confidence: 91,
    size: "234 MB",
    tags: ["political", "deepfake"],
    analyst: "Mike Johnson"
  },
  { 
    id: "CASE-2038", 
    title: "Passport Document Check", 
    type: "document", 
    status: "completed", 
    result: "authentic", 
    date: "2024-01-12", 
    time: "3 days ago",
    confidence: 100,
    size: "0.8 MB",
    tags: ["identity", "passport"],
    analyst: "Jane Smith"
  },
];

const statusFilters = [
  { id: "all", label: "All Cases", count: 156 },
  { id: "completed", label: "Completed", count: 124 },
  { id: "processing", label: "Processing", count: 18 },
  { id: "pending", label: "Pending", count: 14 },
];

const typeFilters = [
  { id: "all", label: "All Types" },
  { id: "image", label: "Images" },
  { id: "video", label: "Videos" },
  { id: "document", label: "Documents" },
];

export default function CasesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<{ field: string; order: "asc" | "desc" }>({ field: "date", order: "desc" });
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort cases
  const filteredCases = casesData.filter((caseItem) => {
    const matchesStatus = selectedStatus === "all" || caseItem.status === selectedStatus;
    const matchesType = selectedType === "all" || caseItem.type === selectedType;
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesType && matchesSearch;
  }).sort((a, b) => {
    const order = sortBy.order === "asc" ? 1 : -1;
    if (sortBy.field === "date") return order * (new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sortBy.field === "confidence") {
      const aConf = a.confidence || 0;
      const bConf = b.confidence || 0;
      return order * (aConf - bConf);
    }
    return 0;
  });

  const toggleCaseSelection = (id: string) => {
    setSelectedCases(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const selectAllCases = () => {
    if (selectedCases.length === filteredCases.length) {
      setSelectedCases([]);
    } else {
      setSelectedCases(filteredCases.map(c => c.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "processing": return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "pending": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getResultColor = (result: string | null) => {
    if (!result) return "text-slate-400";
    return result === "authentic" ? "text-emerald-400" : "text-rose-400";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon className="w-5 h-5 text-purple-400" />;
      case "video": return <Video className="w-5 h-5 text-rose-400" />;
      case "document": return <FileText className="w-5 h-5 text-amber-400" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Case Management</h1>
          <p className="text-slate-400 mt-1">Manage and review all forensic analyses</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/analyze"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-medium hover:from-sky-400 hover:to-indigo-500 transition-all shadow-lg shadow-sky-500/25"
          >
            <Shield className="w-4 h-4" />
            <span>New Analysis</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedStatus(filter.id)}
            className={`p-4 rounded-xl border transition-all text-left ${
              selectedStatus === filter.id
                ? "bg-sky-500/10 border-sky-500/30"
                : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
            }`}
          >
            <p className="text-2xl font-bold text-white">{filter.count}</p>
            <p className={`text-sm ${selectedStatus === filter.id ? "text-sky-400" : "text-slate-400"}`}>
              {filter.label}
            </p>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search cases by ID, title, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all"
          />
        </div>

        {/* Filters & View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
              showFilters ? "bg-sky-500/10 border-sky-500/30 text-sky-400" : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500/50"
          >
            {typeFilters.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>

          <div className="flex items-center bg-slate-900/50 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCases.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl"
        >
          <span className="text-sky-400 font-medium">{selectedCases.length} cases selected</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-rose-400 hover:text-rose-300 transition-colors">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button 
              onClick={() => setSelectedCases([])}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Cases Display */}
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80">
                    <th className="py-4 px-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCases.length === filteredCases.length && filteredCases.length > 0}
                        onChange={selectAllCases}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500/20"
                      />
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Case</th>
                    <th className="py-4 px-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="py-4 px-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <button 
                        onClick={() => setSortBy({ field: "date", order: sortBy.order === "asc" ? "desc" : "asc" })}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        Date
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Result</th>
                    <th className="py-4 px-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <button 
                        onClick={() => setSortBy({ field: "confidence", order: sortBy.order === "asc" ? "desc" : "asc" })}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        Confidence
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredCases.map((caseItem) => (
                    <motion.tr
                      key={caseItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedCases.includes(caseItem.id)}
                          onChange={() => toggleCaseSelection(caseItem.id)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500/20"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                            {getTypeIcon(caseItem.type)}
                          </div>
                          <div>
                            <Link href={`/dashboard/cases/${caseItem.id}`} className="font-mono text-sm text-sky-400 hover:text-sky-300">
                              {caseItem.id}
                            </Link>
                            <p className="text-sm text-white font-medium">{caseItem.title}</p>
                            <div className="flex gap-1 mt-1">
                              {caseItem.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="capitalize text-sm text-slate-300">{caseItem.type}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-slate-300">{caseItem.date}</div>
                        <div className="text-xs text-slate-500">{caseItem.time}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status === "processing" && <Loader2 className="w-3 h-3 animate-spin" />}
                          {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {caseItem.result ? (
                          <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${getResultColor(caseItem.result)}`}>
                            {caseItem.result === "authentic" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                            {caseItem.result.charAt(0).toUpperCase() + caseItem.result.slice(1)}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {caseItem.confidence ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${caseItem.confidence >= 90 ? 'bg-emerald-500' : caseItem.confidence >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                style={{ width: `${caseItem.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-300">{caseItem.confidence}%</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredCases.length === 0 && (
              <div className="p-12 text-center">
                <FolderOpen className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No cases found</h3>
                <p className="text-slate-400">Try adjusting your filters or search query</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredCases.map((caseItem) => (
              <motion.div
                key={caseItem.id}
                layout
                className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 hover:bg-slate-800/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                      {getTypeIcon(caseItem.type)}
                    </div>
                    <div>
                      <p className="font-mono text-xs text-sky-400">{caseItem.id}</p>
                      <p className="text-sm text-slate-500 capitalize">{caseItem.type}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedCases.includes(caseItem.id)}
                    onChange={() => toggleCaseSelection(caseItem.id)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-sky-500"
                  />
                </div>

                <h3 className="font-semibold text-white mb-2 line-clamp-1">{caseItem.title}</h3>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {caseItem.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-400 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status === "processing" && <Loader2 className="w-3 h-3 animate-spin" />}
                      {caseItem.status}
                    </span>
                  </div>
                  
                  {caseItem.result && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Result</span>
                      <span className={`flex items-center gap-1 ${getResultColor(caseItem.result)}`}>
                        {caseItem.result === "authentic" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        {caseItem.result}
                      </span>
                    </div>
                  )}

                  {caseItem.confidence && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Confidence</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${caseItem.confidence >= 90 ? 'bg-emerald-500' : caseItem.confidence >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${caseItem.confidence}%` }}
                          />
                        </div>
                        <span className="text-slate-300">{caseItem.confidence}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-500">{caseItem.time}</span>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <p className="text-sm text-slate-400">
          Showing <span className="text-white font-medium">1</span> to <span className="text-white font-medium">{filteredCases.length}</span> of <span className="text-white font-medium">156</span> cases
        </p>
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1">
            {[1, 2, 3].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page 
                    ? "bg-sky-500 text-white" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="w-8 h-8 flex items-center justify-center text-slate-500">...</span>
            <button className="w-8 h-8 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              12
            </button>
          </div>
          <button 
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}