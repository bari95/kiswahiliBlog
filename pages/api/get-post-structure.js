// pages/api/get-posts-structure.js
import { executeQuery } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔍 Getting wp8d_posts table structure for blog posts only...');
    
    // Get detailed structure of the posts table
    const structureQuery = 'DESCRIBE wp8d_posts';
    const structure = await executeQuery(structureQuery);
    
    // Get count of actual blog posts only
    const countQuery = `
      SELECT COUNT(*) as total_posts 
      FROM wp8d_posts 
      WHERE post_type = 'post' 
      AND post_status = 'publish'
    `;
    const countResult = await executeQuery(countQuery);
    const totalPosts = countResult[0].total_posts;
    
    // Get post status breakdown for blog posts only
    const postStatusQuery = `
      SELECT post_status, COUNT(*) as count 
      FROM wp8d_posts 
      WHERE post_type = 'post'
      GROUP BY post_status 
      ORDER BY count DESC
    `;
    const postStatuses = await executeQuery(postStatusQuery);
    
    // Get sample blog posts (first 10 published blog posts)
    const samplePostsQuery = `
      SELECT ID, post_title, post_type, post_status, post_date, post_author, 
             post_excerpt, post_name, comment_count
      FROM wp8d_posts 
      WHERE post_type = 'post' 
      AND post_status = 'publish' 
      ORDER BY post_date DESC 
      LIMIT 10
    `;
    const samplePosts = await executeQuery(samplePostsQuery);
    
    // Get recent drafts for blog posts
    const draftPostsQuery = `
      SELECT ID, post_title, post_type, post_status, post_date, post_author 
      FROM wp8d_posts 
      WHERE post_type = 'post' 
      AND post_status = 'draft' 
      ORDER BY post_modified DESC 
      LIMIT 5
    `;
    const draftPosts = await executeQuery(draftPostsQuery);
    
    // Get author statistics for blog posts
    const authorStatsQuery = `
      SELECT post_author, COUNT(*) as post_count 
      FROM wp8d_posts 
      WHERE post_type = 'post' 
      AND post_status = 'publish'
      GROUP BY post_author 
      ORDER BY post_count DESC
    `;
    const authorStats = await executeQuery(authorStatsQuery);
    
    console.log('✅ Blog posts structure retrieved successfully');
    console.log(`📊 Total published blog posts: ${totalPosts}`);
    console.log('📋 Post statuses:', postStatuses);
    
    // Format the structure for better readability (focus on blog-relevant columns)
    const blogRelevantColumns = [
      'ID', 'post_author', 'post_date', 'post_date_gmt', 'post_content', 
      'post_title', 'post_excerpt', 'post_status', 'comment_status', 
      'post_name', 'post_modified', 'post_modified_gmt', 'comment_count'
    ];
    
    const formattedStructure = structure
      .filter(col => blogRelevantColumns.includes(col.Field))
      .map(col => ({
        column: col.Field,
        dataType: col.Type,
        allowNull: col.Null === 'YES',
        key: col.Key,
        defaultValue: col.Default,
        extra: col.Extra,
        description: getColumnDescription(col.Field)
      }));
    
    return res.status(200).json({
      message: 'Blog posts structure retrieved successfully',
      tableName: 'wp8d_posts',
      structure: formattedStructure,
      statistics: {
        totalPublishedPosts: totalPosts,
        postStatuses: postStatuses,
        authorStats: authorStats
      },
      samplePosts: samplePosts,
      draftPosts: draftPosts,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error getting blog posts structure:', error);
    return res.status(500).json({
      message: 'Error getting blog posts structure',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to provide descriptions for WordPress post columns
function getColumnDescription(columnName) {
  const descriptions = {
    'ID': 'Unique post identifier',
    'post_author': 'User ID of the post author',
    'post_date': 'Date and time when post was published',
    'post_date_gmt': 'GMT date and time when post was published',
    'post_content': 'Full text content of the post',
    'post_title': 'Title of the post',
    'post_excerpt': 'Post excerpt/summary',
    'post_status': 'Status of post (publish, draft, private, etc.)',
    'comment_status': 'Whether comments are allowed (open/closed)',
    'ping_status': 'Whether pingbacks/trackbacks are allowed',
    'post_password': 'Password for password-protected posts',
    'post_name': 'URL slug of the post',
    'to_ping': 'URLs that should be pinged',
    'pinged': 'URLs that have been pinged',
    'post_modified': 'Date and time when post was last modified',
    'post_modified_gmt': 'GMT date and time when post was last modified',
    'post_content_filtered': 'Cached version of post content',
    'post_parent': 'ID of parent post (for hierarchical posts)',
    'guid': 'Global unique identifier for the post',
    'menu_order': 'Order for sorting (used for pages and custom post types)',
    'post_type': 'Type of content (post, page, attachment, etc.)',
    'post_mime_type': 'MIME type (mainly for attachments)',
    'comment_count': 'Number of comments on the post'
  };
  
  return descriptions[columnName] || 'WordPress posts table column';
}