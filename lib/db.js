// lib/db.js
import mysql from 'mysql2/promise';
console.log('🔗 Initializing database connection...')
;
console.log('server:', process.env.DB_SERVER);
console.log('port:', process.env.DB_PORT);
console.log('user:', process.env.DB_USER)
// Create connection pool instead of single connection
const pool = mysql.createPool({
  host: process.env.DB_SERVER || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  
  // DirectAdmin often requires SSL
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
});

// Enhanced test connection function with detailed logging
export async function testConnection() {
  console.log('🔍 Starting database connection test...');
  console.log('Connection config:');
  console.log('- Host:', process.env.DB_HOST || 'localhost');
  console.log('- Port:', process.env.DB_PORT || 3306);
  console.log('- User:', process.env.DB_USER || '[NOT SET]');
  console.log('- Database:', process.env.DB_NAME || '[NOT SET]');
  console.log('- SSL:', process.env.DB_SSL || 'false');
  console.log('- Password set:', process.env.DB_PASS ? 'Yes' : 'No');

  let connection;
  try {
    console.log('📡 Getting connection from pool...');
    connection = await pool.getConnection();
    console.log('✅ Connection acquired successfully');
    
    console.log('🏓 Pinging database...');
    await connection.ping();
    console.log('✅ Database ping successful');
    
    // Try a simple query to verify full connectivity
    console.log('🔍 Testing simple query...');
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Test query successful:', rows);
    
    connection.release();
    console.log('✅ Connection released back to pool');
    console.log('🎉 Database connected successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Database connection failed with detailed error:');
    console.error('Error type:', typeof error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error errno:', error.errno);
    console.error('Error sqlState:', error.sqlState);
    console.error('Error sqlMessage:', error.sqlMessage);
    console.error('Error fatal:', error.fatal);
    console.error('Full error:', error);
    
    // Common MySQL error codes and their meanings
    if (error.code) {
      switch (error.code) {
        case 'ENOTFOUND':
          console.error('🔍 DNS lookup failed - check DB_HOST');
          break;
        case 'ECONNREFUSED':
          console.error('🔍 Connection refused - check if MySQL is running and DB_PORT is correct');
          break;
        case 'ER_ACCESS_DENIED_ERROR':
          console.error('🔍 Access denied - check DB_USER and DB_PASS');
          break;
        case 'ER_BAD_DB_ERROR':
          console.error('🔍 Database does not exist - check DB_NAME');
          break;
        case 'PROTOCOL_CONNECTION_LOST':
          console.error('🔍 Connection lost - server might have closed the connection');
          break;
        case 'ER_CON_COUNT_ERROR':
          console.error('🔍 Too many connections - server might be overloaded');
          break;
        case 'ER_USER_LIMIT_REACHED':
          console.error('🔍 User connection limit reached');
          break;
        case 'ER_SPECIFIC_ACCESS_DENIED_ERROR':
          console.error('🔍 Access denied for specific operation');
          break;
        case 'ETIMEDOUT':
          console.error('🔍 Connection timeout - server might be slow or unreachable');
          break;
        default:
          console.error('🔍 Unknown error code:', error.code);
      }
    }
    
    if (connection) {
      try {
        connection.release();
        console.log('🔄 Connection released after error');
      } catch (releaseError) {
        console.error('❌ Error releasing connection:', releaseError);
      }
    }
    
    return false;
  }
}

// Helper function to execute queries
export async function executeQuery(query, params) {
  try {
    // If no params provided or empty array, don't pass params to execute
    if (!params || params.length === 0) {
      const [results] = await pool.execute(query);
      return results;
    } else {
      const [results] = await pool.execute(query, params);
      return results;
    }
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
}

// Helper function to get a single row
export async function getRow(query, params) {
  try {
    if (!params || params.length === 0) {
      const [results] = await pool.execute(query);
      return results[0] || null;
    } else {
      const [results] = await pool.execute(query, params);
      return results[0] || null;
    }
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
}

// Close pool when application shuts down
export async function closePool() {
  try {
    await pool.end();
    console.log('Database pool closed');
  } catch (error) {
    console.error('Error closing database pool:', error);
  }
}

export default pool;