// Blog Post Card Component

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Search, Filter, Globe, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

import PostMeta from './PostMeta';
import ActionButtons from './ActionButtons'; // Assuming you have an ActionButtons component
import ShareButtons from './ShareButtons'; // Updated import to use our refactored ShareButton

const BlogPostCard = ({ post, isExpanded, onToggleExpand }) => {
  // Clean HTML content for display (only remove WordPress blocks)
  const cleanContent = (htmlContent) => {
    if (!htmlContent) return '';
    
    return htmlContent
      .replace(/<!-- wp:.*? -->/g, '')
      .replace(/<!-- \/wp:.*? -->/g, '')
      .trim();
  };

  // Sanitize HTML content for safe rendering
  const sanitizeHtml = (htmlContent) => {
    if (!htmlContent) return '';
    
    let sanitized = htmlContent
      .replace(/<!-- wp:.*? -->/g, '')
      .replace(/<!-- \/wp:.*? -->/g, '')
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '');
    
    return sanitized;
  };

  // Extract excerpt from content (strip HTML for excerpt only)
  const getExcerpt = (post) => {
    if (post.excerpt && post.excerpt.trim()) {
      const cleanExcerpt = post.excerpt.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
      return cleanExcerpt;
    }
    const content = post.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  // Generate URL for sharing (you'll need to adjust this based on your routing)
  const getPostUrl = (post) => {
    return `${window.location.origin}/post/${post.id}`;
  };

  return (
    <article 
      key={`post-${post.id}`}
      className="rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-body border border-border" 
    >
      {/* Post Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold leading-tight text-text-dark font-primary">
            {post.title}
          </h2>
          <div className="flex items-center gap-3">
            <ShareButtons 
              url={getPostUrl(post)} 
              title={post.title}
            />
            <button
              onClick={() => onToggleExpand(post.id)}
              className="px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-80 bg-primary text-body font-primary font-semibold"
            >
              {isExpanded ? 'Funga' : 'Soma'}
            </button>
          </div>
        </div>
        
        <PostMeta publishedDate={post.publishedDate} />
      </div>

      {/* Post Content */}
      <div className="p-6">
        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 p-6 rounded-xl bg-theme-light">
            <style>{`
              .kiswahili-content {
                line-height: 1.7;
              }
              .kiswahili-content p {
                margin-bottom: 1rem;
              }
              .kiswahili-content h1, .kiswahili-content h2, .kiswahili-content h3, 
              .kiswahili-content h4, .kiswahili-content h5, .kiswahili-content h6 {
                font-weight: bold;
                margin: 1.5rem 0 1rem 0;
              }
              .kiswahili-content h1 { font-size: 1.875rem; }
              .kiswahili-content h2 { font-size: 1.5rem; }
              .kiswahili-content h3 { font-size: 1.25rem; }
              .kiswahili-content ul, .kiswahili-content ol {
                padding-left: 1.5rem;
                margin-bottom: 1rem;
              }
              .kiswahili-content li {
                margin-bottom: 0.5rem;
              }
              .kiswahili-content strong {
                font-weight: bold;
              }
              .kiswahili-content em {
                font-style: italic;
              }
              .kiswahili-content blockquote {
                border-left: 4px solid;
                padding-left: 1rem;
                margin: 1rem 0;
                font-style: italic;
              }
              .kiswahili-content code {
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-family: monospace;
              }
              .kiswahili-content pre {
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
              }
            `}</style>
            <div className="prose prose-lg max-w-none">
              <div 
                className="kiswahili-content text-text-default font-secondary [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_h4]:text-primary [&_h5]:text-primary [&_h6]:text-primary [&_h1]:font-primary [&_h2]:font-primary [&_h3]:font-primary [&_h4]:font-primary [&_h5]:font-primary [&_h6]:font-primary [&_strong]:text-primary [&_blockquote]:border-primary [&_blockquote]:bg-body [&_code]:bg-theme-light [&_pre]:bg-theme-light"
                dangerouslySetInnerHTML={{ 
                  __html: sanitizeHtml(post.content)
                }}
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <ActionButtons postId={post.id} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPostCard;