// Action Buttons Component


import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const ActionButtons = ({ postId }) => (
  <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: '#D4A574' }}>
    <div className="flex items-center space-x-4">
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-80" style={{ backgroundColor: '#C04000', color: '#FFF8F5' }}>
        <Heart className="w-4 h-4" />
        <span>Penda</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-80" style={{ backgroundColor: '#8B6F47', color: '#FFF8F5' }}>
        <Globe className="w-4 h-4" />
        <span>Shiriki</span>
      </button>
    </div>
    <span className="text-sm" style={{ color: '#8B6F47' }}>
      Lesson #{postId}
    </span>
  </div>
);


export default ActionButtons;