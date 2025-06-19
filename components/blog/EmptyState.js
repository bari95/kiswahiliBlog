// Empty State Component

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const EmptyState = () => (
  <div className="text-center py-16">
    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: '#8B6F47' }} />
    <h3 className="text-xl font-semibold mb-2" style={{ color: '#4A3426' }}>
      Hakuna masomo yaliyopatikana
    </h3>
    <p style={{ color: '#8B6F47' }}>
      No lessons found. Try adjusting your search terms.
    </p>
  </div>
);


export default EmptyState;