// Post Meta Component

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const PostMeta = ({ publishedDate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center space-x-6 text-sm" style={{ color: '#8B6F47' }}>
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(publishedDate)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <User className="w-4 h-4" />
        <span>Mwalimu</span>
      </div>
      <div className="flex items-center space-x-2">
        <BookOpen className="w-4 h-4" />
        <span>Kiswahili</span>
      </div>
    </div>
  );
};


export default PostMeta;