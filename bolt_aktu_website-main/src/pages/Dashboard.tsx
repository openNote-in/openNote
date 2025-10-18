import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, Mail, Calendar, Shield } from 'lucide-react';
import { resourceService } from '../services/resourceService';
import { BookOpen, FileText, Download, Eye, Search, Filter, ChevronRight, GraduationCap, Cpu, Zap, Settings } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'notes' | 'quantum' | 'pyq' | 'syllabus';
  isPremium: boolean;
  year: number;
  branch: string;
  subject: string;
  downloadUrl?: string;
  viewUrl?: string;
  size: string;
  description: string;
  tags: string[];
  uploadDate: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedBranch, setBranch] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const years = [1, 2, 3, 4];
  const branches = [
    { code: 'CSE', name: 'Computer Science & Engineering', icon: Cpu },
    { code: 'IT', name: 'Information Technology', icon: BookOpen },
    { code: 'ECE', name: 'Electronics & Communication', icon: Zap }
  ];

  const resourceTypes = [
    { value: 'all', label: 'All Resources' },
    { value: 'notes', label: 'Notes' },
    { value: 'quantum', label: 'Quantum Books' },
    { value: 'pyq', label: 'Previous Year Questions' },
    { value: 'syllabus', label: 'Syllabus' }
  ];

  useEffect(() => {
    if (selectedYear && selectedBranch) {
      loadSubjects();
    }
  }, [selectedYear, selectedBranch]);

  useEffect(() => {
    if (selectedYear && selectedBranch && selectedSubject) {
      loadResources();
    }
  }, [selectedYear, selectedBranch, selectedSubject]);

  const loadSubjects = async () => {
    if (!selectedYear || !selectedBranch) return;
    
    setLoading(true);
    try {
      const availableSubjects = await resourceService.getSubjects(selectedYear, selectedBranch);
      setSubjects(availableSubjects);
    } catch (error) {
      console.error('Error loading subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadResources = async () => {
    if (!selectedYear || !selectedBranch || !selectedSubject) return;
    
    setLoading(true);
    try {
      const resourceList = await resourceService.getResources({
        year: selectedYear,
        branch: selectedBranch,
        subject: selectedSubject
      });
      setResources(resourceList);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleResourceAccess = (resource: Resource) => {
    if (resource.isPremium && user?.subscription !== 'premium') {
      alert('This is a premium resource. Please upgrade to access it.');
      return;
    }

    if (resource.isPremium && resource.viewUrl) {
      // Open secure PDF viewer for premium content
      window.open(`/pdf-viewer?url=${encodeURIComponent(resource.viewUrl)}&title=${encodeURIComponent(resource.title)}`, '_blank');
    } else if (resource.downloadUrl) {
      // Direct download for free resources
      window.open(resource.downloadUrl, '_blank');
    }
  };

  const resetSelection = () => {
    setSelectedYear(null);
    setBranch(null);
    setSelectedSubject(null);
    setResources([]);
    setSubjects([]);
    setSearchTerm('');
    setFilterType('all');
  };

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Dashboard Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {user?.displayName || user?.email}</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-white">
                  {user?.displayName || 'User'}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {user?.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wider">
                      Account Info
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2 px-3 py-2 text-gray-300">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{user?.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recently'}</span>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-2 text-gray-300">
                        <Shield className="w-4 h-4" />
                        <span>Email {user?.emailVerified ? 'Verified' : 'Not Verified'}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb and Navigation */}
        <div className="mb-8">          
          {/* Breadcrumb */}
          {(selectedYear || selectedBranch || selectedSubject) && (
            <div className="flex items-center space-x-2 mt-4 text-sm">
              <button
                onClick={resetSelection}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Dashboard
              </button>
              {selectedYear && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">Year {selectedYear}</span>
                </>
              )}
              {selectedBranch && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{selectedBranch}</span>
                </>
              )}
              {selectedSubject && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{selectedSubject}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {!selectedYear && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Free Resources</h3>
                  <p className="text-blue-400">Unlimited Access</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Account Status</h3>
                  <p className="text-purple-400">Active User</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Profile</h3>
                  <p className="text-green-400">{user?.emailVerified ? 'Verified' : 'Pending'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Year Selection */}
        {!selectedYear && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
              Select Your Year
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-750 transition-all duration-200 group"
                >
                  <div className="text-2xl font-bold text-blue-400 mb-2">{year}</div>
                  <div className="text-gray-300 group-hover:text-white transition-colors">
                    {year === 1 ? '1st' : year === 2 ? '2nd' : year === 3 ? '3rd' : '4th'} Year
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Branch Selection */}
        {selectedYear && !selectedBranch && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Your Branch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {branches.map((branch) => {
                const IconComponent = branch.icon;
                return (
                  <button
                    key={branch.code}
                    onClick={() => setBranch(branch.code)}
                    className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-750 transition-all duration-200 group text-left"
                  >
                    <IconComponent className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300 transition-colors" />
                    <div className="text-lg font-semibold text-white mb-1">{branch.code}</div>
                    <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {branch.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Subject Selection */}
        {selectedYear && selectedBranch && !selectedSubject && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Subject</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500 hover:bg-gray-750 transition-all duration-200 group text-left"
                  >
                    <BookOpen className="w-6 h-6 text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors" />
                    <div className="text-white font-medium group-hover:text-cyan-100 transition-colors">
                      {subject}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resources */}
        {selectedYear && selectedBranch && selectedSubject && (
          <div>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer"
                >
                  {resourceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resource List */}
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-400 mr-2" />
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resource.type === 'notes' ? 'bg-blue-900 text-blue-300' :
                          resource.type === 'quantum' ? 'bg-purple-900 text-purple-300' :
                          resource.type === 'pyq' ? 'bg-green-900 text-green-300' :
                          'bg-yellow-900 text-yellow-300'
                        }`}>
                          {resource.type.toUpperCase()}
                        </span>
                      </div>
                      {resource.isPremium && (
                        <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.size}</span>
                      <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleResourceAccess(resource)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                        resource.isPremium
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {resource.isPremium ? (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          View Secure
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {filteredResources.length === 0 && !loading && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Resources Found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No resources available for this subject yet.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;