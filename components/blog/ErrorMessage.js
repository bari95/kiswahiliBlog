// Error Component

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const ErrorMessage = ({ error }) => (
  <div className="min-h-screen" style={{ backgroundColor: '#FFF8F5' }}>
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 rounded-lg" style={{ backgroundColor: '#F5E6D3', color: '#4A3426' }}>
        <h2 className="text-xl font-bold mb-2">Samahani! (Sorry!)</h2>
        <p>Unable to load lessons: {error}</p>
      </div>
    </div>
  </div>
);

export default ErrorMessage