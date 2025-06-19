// pages/api/get-tables.js
import { executeQuery } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔍 Retrieving database tables...');
    
    // Query to get all table names from the current database
    const query = 'SHOW TABLES';
    const tables = await executeQuery(query);
    
    console.log('✅ Tables retrieved successfully:', tables);
    
    // Extract table names from the result
    // MySQL returns tables in format: [{ 'Tables_in_databasename': 'table1' }, ...]
    const tableNames = tables.map(table => {
      // Get the first (and only) property value from each result object
      const tableName = Object.values(table)[0];
      return tableName;
    });
    
    console.log('📋 Table names:', tableNames);
    
    return res.status(200).json({
      message: 'Tables retrieved successfully',
      tables: tableNames,
      count: tableNames.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error retrieving tables:', error);
    return res.status(500).json({
      message: 'Error retrieving tables',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}