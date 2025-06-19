import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';


import SearchBar from './SearchBar';    
import BlogPostCard from './BlogPostCard';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import BlogHeader from './BoogHeader';

import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';  
import ActionButtons from './ActionButtons'; 
import PostMeta from './PostMeta'; // Uncomment if you want to use PostMeta component
// Header Component














// Main Blog Component
const KiswahiliBlogComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPost, setExpandedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts from API
  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchTerm]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm })
      });
      
      const response = await fetch(`/api/blog-posts?${params}`);
      const data = await response.json();
      
      if (data.message === 'Blog posts retrieved successfully') {
        console.log('Fetched posts:', data.data.posts);
        setPosts(data.data.posts);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.message || 'Failed to fetch posts');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleToggleExpand = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedPost(null); // Close expanded post when changing pages
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.replace(/<[^>]*>/g, '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BlogHeader />
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        
        {/* Blog Posts */}
        <div className="grid gap-8 lg:gap-12">
          {filteredPosts.map((post) => (
            <BlogPostCard
              key={`blog-post-${post.id}`}
              post={post}
              isExpanded={expandedPost === post.id}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>

        <Pagination 
          pagination={pagination} 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
        />

        {filteredPosts.length === 0 && !loading && <EmptyState />}
      </div>
    </div>
  );
};

export default KiswahiliBlogComponent;