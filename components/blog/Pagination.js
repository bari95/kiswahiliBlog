// Pagination Component
import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';


const Pagination = ({ pagination, currentPage, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={!pagination.hasPrevPage}
        className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        style={{ 
          backgroundColor: pagination.hasPrevPage ? '#C04000' : '#D4A574',
          color: '#FFF8F5'
        }}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Nyuma</span>
      </button>
      
      <div className="flex items-center space-x-2">
        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === pagination.currentPage;
          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              className="w-10 h-10 rounded-lg font-medium transition-colors duration-200"
              style={{ 
                backgroundColor: isActive ? '#C04000' : '#F5E6D3',
                color: isActive ? '#FFF8F5' : '#4A3426'
              }}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, pagination.totalPages))}
        disabled={!pagination.hasNextPage}
        className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        style={{ 
          backgroundColor: pagination.hasNextPage ? '#C04000' : '#D4A574',
          color: '#FFF8F5'
        }}
      >
        <span>Mbele</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;