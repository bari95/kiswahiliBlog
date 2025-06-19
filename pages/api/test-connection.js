import { testConnection } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Log environment variables (without exposing sensitive data)
  console.log('=== DATABASE CONNECTION DEBUG ===');
  console.log('DB_HOST:', process.env.DB_HOST || 'undefined');
  console.log('DB_PORT:', process.env.DB_PORT || 'undefined');
  console.log('DB_USER:', process.env.DB_USER || 'undefined');
  console.log('DB_PASS:', process.env.DB_PASS ? '[SET]' : '[NOT SET]');
  console.log('DB_NAME:', process.env.DB_NAME || 'undefined');
  console.log('DB_SSL:', process.env.DB_SSL || 'undefined');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('================================');

  try {
    console.log('Attempting database connection...');
    const isConnected = await testConnection();
    console.log('Connection result:', isConnected);
    
    if (isConnected) {
      console.log('✅ Database connection successful!');
      return res.status(200).json({ 
        message: 'Database connection successful!',
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('❌ Database connection failed!');
      return res.status(500).json({ 
        message: 'Database connection failed!',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Database connection error details:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error errno:', error.errno);
    console.error('Error sqlState:', error.sqlState);
    console.error('Error sqlMessage:', error.sqlMessage);
    console.error('Full error object:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      timestamp: new Date().toISOString()
    });
  }
}