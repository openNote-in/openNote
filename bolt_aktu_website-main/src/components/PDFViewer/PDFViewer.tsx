import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, RotateCw, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

interface PDFViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10); // Mock total pages
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
            Premium Content
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-white px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-white px-2 min-w-[50px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleRotate}
            className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Download className="w-4 h-4" />
            <span className="line-through">Download Disabled</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 bg-gray-800 overflow-auto">
        <div className="flex justify-center items-center min-h-full p-8">
          <div
            className="bg-white shadow-2xl"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Mock PDF Content */}
            <div className="w-[794px] h-[1123px] bg-white border border-gray-300 p-8 overflow-hidden">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Premium Content</h1>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
              </div>
              
              <div className="space-y-6 text-gray-800">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h2 className="text-lg font-semibold text-blue-800 mb-2">Important Notice</h2>
                  <p className="text-blue-700">
                    This is premium content viewable only within the openNote platform. 
                    Downloads are disabled for security and copyright protection.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Page {currentPage} Content</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Premium Features</h3>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Curated content by AKTU experts</li>
                    <li>• Detailed explanations and solutions</li>
                    <li>• Updated according to latest syllabus</li>
                    <li>• Secure viewing environment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-5">
          <div className="text-6xl font-bold text-gray-600 whitespace-nowrap">
            openNote Premium • No Downloads • Secure Viewing
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;