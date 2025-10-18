import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { resourceService } from '../services/resourceService';
import { BookOpen, FileText, Download, Eye, Search, Filter, ChevronRight, GraduationCap, Cpu, Zap, Star, TrendingUp, Clock, Award } from 'lucide-react';

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

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedBranch, setBranch] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

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
      const availableSubjects = await resourceService.getSubjectsByBranch(selectedBranch);
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
        year: selectedYear.toString(),
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
    if (resource.isPremium && user?.role !== 'admin') {
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDisplayName = () => {
    return user?.displayName || user?.email?.split('@')[0] || 'Student';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* User Avatar */}
              <div className="relative">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-500/30"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-4 border-gray-900 rounded-full"></div>
              </div>
              
              {/* Welcome Message */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  {getGreeting()}, {getDisplayName()}! 👋
                </h1>
                <p className="text-blue-300 mt-1">Ready to continue your AKTU journey?</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">12</div>
                <div className="text-xs text-gray-400">Resources Accessed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">5</div>
                <div className="text-xs text-gray-400">Subjects Studied</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">8h</div>
                <div className="text-xs text-gray-400">Study Time</div>
              </div>
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

        {/* Quick Action Cards */}
        {!selectedYear && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div
  onClick={() =>
    window.open(
      "https://drive.google.com/drive/folders/1Fb6onOVdWiqmibHSXOVXfNmuDa0jQn4I?usp=sharing",
      "_blank"
    )
  }
  className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer group"
>
  <div className="flex items-center space-x-3">
    <BookOpen className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
    <div>
      <h3 className="text-lg font-semibold text-white">Free Resources</h3>
      <p className="text-blue-400 text-sm">Unlimited Access</p>
    </div>
  </div>
</div>

            
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 hover:bg-purple-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Premium Content</h3>
                  <p className="text-purple-400 text-sm">Upgrade Available</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 hover:bg-green-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Progress</h3>
                  <p className="text-green-400 text-sm">Track Learning</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Recent</h3>
                  <p className="text-orange-400 text-sm">Last Accessed</p>
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
                  className="p-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl hover:border-blue-500 hover:bg-gray-800/70 transition-all duration-300 group hover:scale-105"
                >
                  <div className="text-2xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{year}</div>
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
                    className="p-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl hover:border-purple-500 hover:bg-gray-800/70 transition-all duration-300 group text-left hover:scale-105"
                  >
                    <IconComponent className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300 transition-colors group-hover:scale-110" />
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
                    className="p-4 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl hover:border-cyan-500 hover:bg-gray-800/70 transition-all duration-300 group text-left hover:scale-105"
                  >
                    <BookOpen className="w-6 h-6 text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors group-hover:scale-110" />
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
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer"
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
                    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-400 mr-2" />
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resource.type === 'notes' ? 'bg-blue-900/50 text-blue-300' :
                          resource.type === 'quantum' ? 'bg-purple-900/50 text-purple-300' :
                          resource.type === 'pyq' ? 'bg-green-900/50 text-green-300' :
                          'bg-yellow-900/50 text-yellow-300'
                        }`}>
                          {resource.type.toUpperCase()}
                        </span>
                      </div>
                      {resource.isPremium && (
                        <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-purple-300 rounded-full border border-purple-500/30">
                          Premium
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-100 transition-colors">
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
                          className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleResourceAccess(resource)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 ${
                        resource.isPremium
                          ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600/70 hover:to-pink-600/70 text-purple-200 border border-purple-500/30'
                          : 'bg-blue-600/50 hover:bg-blue-600/70 text-blue-200 border border-blue-500/30'
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

export default UserDashboard;