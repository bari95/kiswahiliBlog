
import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';


const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0">
    <div className="max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#8B6F47' }} />
        <input
          type="text"
          placeholder="Search lessons... (Tafuta masomo...)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
          style={{ 
            backgroundColor: '#FFF8F5',
            borderColor: '#D4A574',
            color: '#4A3426'
          }}
        />
      </div>
    </div>
  </div>
);

export default SearchBar;