// Loading Component

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="min-h-screen" style={{ backgroundColor: '#FFF8F5' }}>
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#C04000' }} />
        <p style={{ color: '#4A3426' }}>Loading Kiswahili lessons...</p>
      </div>
    </div>
  </div>
);


export default LoadingSpinner;