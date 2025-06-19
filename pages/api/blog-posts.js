// pages/api/get-blog-posts-simple.js
import { executeQuery } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'publish', 
      author = null,
      search = null,
      orderBy = 'post_date',
      order = 'DESC'
    } = req.query;

    console.log('🔍 Getting blog posts data (simple version)...');
    
    // Calculate offset for pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build WHERE clause
    let whereClause = `WHERE post_type = 'post'`;
    let queryParams = [];
    
    if (status && status !== 'all') {
      whereClause += ` AND post_status = ?`;
      queryParams.push(status);
    }
    
    if (author) {
      whereClause += ` AND post_author = ?`;
      queryParams.push(parseInt(author));
    }
    
    if (search) {
      whereClause += ` AND (post_title LIKE ? OR post_content LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }
    
    // Validate orderBy and order parameters
    const validOrderBy = ['post_date', 'post_title', 'post_modified', 'comment_count', 'ID'];
    const validOrder = ['ASC', 'DESC'];
    const safeOrderBy = validOrderBy.includes(orderBy) ? orderBy : 'post_date';
    const safeOrder = validOrder.includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';
    
    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) as total FROM wp8d_posts ${whereClause}`;
    console.log('Count Query:', countQuery, 'Params:', queryParams);
    
    const countResult = await executeQuery(countQuery, queryParams);
    const totalPosts = countResult[0].total;
    
    // Get blog posts data
const postsQuery = `
  SELECT * FROM wp8d_posts 
  WHERE post_type = 'post' 
  AND post_status = 'publish'
  ORDER BY post_date DESC
  LIMIT 10 OFFSET 0
`;
    
    console.log('Posts Query:', postsQuery);
    console.log('Query Params:', [...queryParams, parseInt(limit), offset]);
    console.log('WHERE clause:', whereClause);
console.log('Query Params for posts:', queryParams);
console.log('Additional params (limit, offset):', [parseInt(limit), offset]);
console.log('Total params being passed:', [...queryParams, parseInt(limit), offset]);

// Count the ? placeholders
const placeholderCount = (postsQuery.match(/\?/g) || []).length;
const paramCount = [...queryParams, parseInt(limit), offset].length;
console.log('Placeholder count:', placeholderCount);
console.log('Parameter count:', paramCount);
    
    const posts = await executeQuery(postsQuery, [...queryParams, parseInt(limit), offset]);
    
    // Format posts without author lookup
    const formattedPosts = posts.map(post => ({
      id: post.ID,
      title: post.post_title,
      content: post.post_content,
      excerpt: post.post_excerpt,
      slug: post.post_name,
      status: post.post_status,
      authorId: post.post_author,
      publishedDate: post.post_date,
      publishedDateGMT: post.post_date_gmt,
      modifiedDate: post.post_modified,
      modifiedDateGMT: post.post_modified_gmt,
      commentStatus: post.comment_status,
      commentCount: post.comment_count,
      // Generate full URL (adjust base URL as needed)
      url: `https://kiswahili.co.tz/${post.post_name}/`
    }));
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalPosts / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;
    
    console.log(`✅ Retrieved ${posts.length} blog posts (page ${page} of ${totalPages})`);
    
    return res.status(200).json({
      message: 'Blog posts retrieved successfully',
      data: {
        posts: formattedPosts,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalPosts,
          postsPerPage: parseInt(limit),
          hasNextPage,
          hasPrevPage
        },
        filters: {
          status,
          author: author ? parseInt(author) : null,
          search,
          orderBy: safeOrderBy,
          order: safeOrder
        }
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error getting blog posts:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({
      message: 'Error getting blog posts',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
  }
}

// Test function to check if wp8d_posts table is accessible
export async function testPostsTable() {
  try {
    console.log('🧪 Testing wp8d_posts table access...');
    
    const testQuery = 'SELECT COUNT(*) as count FROM wp8d_posts WHERE post_type = "post"';
    const result = await executeQuery(testQuery);
    
    console.log('✅ Posts table test successful:', result[0]);
    return result[0];
    
  } catch (error) {
    console.error('❌ Posts table test failed:', error);
    throw error;
  }
}