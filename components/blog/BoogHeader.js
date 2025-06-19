

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogHeader = () => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center mb-6">
      <div className="p-4 rounded-full mr-4" style={{ backgroundColor: '#F5E6D3' }}>
        <BookOpen className="w-8 h-8" style={{ color: '#C04000' }} />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#2C1810' }}>
          Masomo ya Kiswahili
        </h1>
        <p className="text-lg" style={{ color: '#8B6F47' }}>
          Learning Swahili - The Heart of East Africa
        </p>
      </div>
    </div>
    <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#C04000' }}></div>
  </div>
);


export default BlogHeader;