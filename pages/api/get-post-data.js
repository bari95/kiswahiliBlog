// pages/api/get-blog-posts.js
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

    console.log('🔍 Getting blog posts data...');
    
    // Calculate offset for pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build WHERE clause
    let whereClause = `WHERE post_type = 'post'`;
    let queryParams = [];
    
    if (status && status !== 'all') {
      whereClause += ` AND post_status = ?`;
      queryParams.push(status);
    }
    
    if (author) 
        {
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
    const countResult = await executeQuery(countQuery, queryParams);
    const totalPosts = countResult[0].total;
    
    // Get blog posts data
    const postsQuery = `
      SELECT 
        ID,
        post_author,
        post_date,
        post_date_gmt,
        post_content,
        post_title,
        post_excerpt,
        post_status,
        comment_status,
        post_name,
        post_modified,
        post_modified_gmt,
        comment_count
      FROM wp8d_posts 
      ${whereClause}
      ORDER BY ${safeOrderBy} ${safeOrder}
      LIMIT ? OFFSET ?
    `;
    
    const posts = await executeQuery(postsQuery, [...queryParams, parseInt(limit), offset]);
    
    // Get author information for the posts
    const authorIds = [...new Set(posts.map(post => post.post_author))];
    let authors = {};
    
    if (authorIds.length > 0) {
      const authorsQuery = `
        SELECT ID, user_login, user_email, user_nicename, display_name 
        FROM wp8d_users 
        WHERE ID IN (${authorIds.map(() => '?').join(',')})
      `;
      const authorResults = await executeQuery(authorsQuery, authorIds);
      authors = authorResults.reduce((acc, author) => {
        acc[author.ID] = author;
        return acc;
      }, {});
    }
    
    // Format posts with author information
    const formattedPosts = posts.map(post => ({
      id: post.ID,
      title: post.post_title,
      content: post.post_content,
      excerpt: post.post_excerpt,
      slug: post.post_name,
      status: post.post_status,
      author: {
        id: post.post_author,
        ...authors[post.post_author]
      },
      publishedDate: post.post_date,
      publishedDateGMT: post.post_date_gmt,
      modifiedDate: post.post_modified,
      modifiedDateGMT: post.post_modified_gmt,
      commentStatus: post.comment_status,
      commentCount: post.comment_count,
      // Generate full URL (you might want to adjust the base URL)
      url: `https://yoursite.com/${post.post_name}/`
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
    return res.status(500).json({
      message: 'Error getting blog posts',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Alternative endpoint for getting a single post by ID or slug
// pages/api/get-blog-post/[identifier].js
export async function getSinglePost(identifier, isSlug = false) {
  try {
    const column = isSlug ? 'post_name' : 'ID';
    const query = `
      SELECT 
        ID,
        post_author,
        post_date,
        post_date_gmt,
        post_content,
        post_title,
        post_excerpt,
        post_status,
        comment_status,
        post_name,
        post_modified,
        post_modified_gmt,
        comment_count
      FROM wp8d_posts 
      WHERE post_type = 'post' 
      AND ${column} = ?
      AND post_status = 'publish'
      LIMIT 1
    `;
    
    const posts = await executeQuery(query, [identifier]);
    
    if (posts.length === 0) {
      return null;
    }
    
    const post = posts[0];
    
    // Get author information
    const authorQuery = `
      SELECT ID, user_login, user_email, user_nicename, display_name 
      FROM wp8d_users 
      WHERE ID = ?
    `;
    const authorResult = await executeQuery(authorQuery, [post.post_author]);
    const author = authorResult[0] || null;
    
    return {
      id: post.ID,
      title: post.post_title,
      content: post.post_content,
      excerpt: post.post_excerpt,
      slug: post.post_name,
      status: post.post_status,
      author: author ? {
        id: author.ID,
        login: author.user_login,
        email: author.user_email,
        nicename: author.user_nicename,
        displayName: author.display_name
      } : null,
      publishedDate: post.post_date,
      publishedDateGMT: post.post_date_gmt,
      modifiedDate: post.post_modified,
      modifiedDateGMT: post.post_modified_gmt,
      commentStatus: post.comment_status,
      commentCount: post.comment_count,
      url: `https://yoursite.com/${post.post_name}/`
    };
    
  } catch (error) {
    console.error('❌ Error getting single post:', error);
    throw error;
  }
}