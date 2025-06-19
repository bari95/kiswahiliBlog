// pages/api/get-table-details.js
import { executeQuery } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔍 Retrieving detailed table information...');
    
    // Get all table names
    const tablesQuery = 'SHOW TABLES';
    const tablesResult = await executeQuery(tablesQuery);
    
    const tableNames = tablesResult.map(table => Object.values(table)[0]);
    console.log('📋 Found tables:', tableNames);
    
    // Get detailed information for each table
    const tableDetails = [];
    
    for (const tableName of tableNames) {
      try {
        console.log(`🔍 Getting details for table: ${tableName}`);
        
        // Get column information
        const columnsQuery = `DESCRIBE ${tableName}`;
        const columns = await executeQuery(columnsQuery);
        
        // Get row count
        const countQuery = `SELECT COUNT(*) as count FROM ${tableName}`;
        const countResult = await executeQuery(countQuery);
        const rowCount = countResult[0].count;
        
        tableDetails.push({
          name: tableName,
          columns: columns.map(col => ({
            name: col.Field,
            type: col.Type,
            null: col.Null === 'YES',
            key: col.Key,
            default: col.Default,
            extra: col.Extra
          })),
          rowCount: rowCount
        });
        
        console.log(`✅ Retrieved details for ${tableName}: ${columns.length} columns, ${rowCount} rows`);
        
      } catch (tableError) {
        console.error(`❌ Error getting details for table ${tableName}:`, tableError);
        tableDetails.push({
          name: tableName,
          error: tableError.message,
          columns: [],
          rowCount: 0
        });
      }
    }
    
    return res.status(200).json({
      message: 'Table details retrieved successfully',
      tables: tableDetails,
      totalTables: tableDetails.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error retrieving table details:', error);
    return res.status(500).json({
      message: 'Error retrieving table details',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}