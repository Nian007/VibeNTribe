import fs from 'fs';
import path from 'path';
import { pool, testConnection } from '../config/database';
import { config } from '../config';

/**
 * Database migration utility
 * Reads and executes SQL schema file
 */
class DatabaseMigrator {
  private schemaPath: string;

  constructor() {
    this.schemaPath = path.join(__dirname, 'schema.sql');
  }

  /**
   * Run database migrations
   */
  async migrate(): Promise<void> {
    try {
      console.log('🚀 Starting database migration...');

      // Test database connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error('Database connection failed');
      }

      // Read schema file
      const schema = await this.readSchemaFile();
      
      // Split schema into individual statements
      const statements = this.parseStatements(schema);
      
      // Execute each statement
      await this.executeStatements(statements);
      
      console.log('✅ Database migration completed successfully');
      
    } catch (error) {
      console.error('❌ Database migration failed:', error);
      throw error;
    }
  }

  /**
   * Read SQL schema file
   */
  private async readSchemaFile(): Promise<string> {
    try {
      const schema = fs.readFileSync(this.schemaPath, 'utf8');
      console.log('📖 Schema file loaded successfully');
      return schema;
    } catch (error) {
      throw new Error(`Failed to read schema file: ${error}`);
    }
  }

  /**
   * Parse SQL statements from schema
   */
  private parseStatements(schema: string): string[] {
    // Remove comments and split by semicolon
    const statements = schema
      .split('\n')
      .filter(line => !line.trim().startsWith('--') && line.trim() !== '')
      .join('\n')
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    return statements;
  }

  /**
   * Execute SQL statements
   */
  private async executeStatements(statements: string[]): Promise<void> {
    const connection = await pool.getConnection();
    
    try {
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        
        try {
          await connection.execute(statement);
          console.log(`✓ Statement ${i + 1}/${statements.length} executed successfully`);
        } catch (error: any) {
          // Log warning for non-critical errors (like table already exists)
          if (error.code === 'ER_TABLE_EXISTS_ERROR' || 
              error.code === 'ER_DUP_KEYNAME' ||
              error.message.includes('already exists')) {
            console.log(`⚠️  Statement ${i + 1}: ${error.message} (skipped)`);
          } else {
            throw new Error(`Statement ${i + 1} failed: ${error.message}`);
          }
        }
      }
    } finally {
      connection.release();
    }
  }

  /**
   * Drop all tables (for development/testing)
   */
  async dropTables(): Promise<void> {
    const connection = await pool.getConnection();
    
    try {
      console.log('🗑️  Dropping all tables...');
      
      // Disable foreign key checks
      await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
      
      // Get all tables
      const [tables] = await connection.execute(
        'SELECT table_name FROM information_schema.tables WHERE table_schema = ?',
        [config.database.name]
      );
      
      // Drop each table
      for (const table of tables as any[]) {
        await connection.execute(`DROP TABLE IF EXISTS ${table.table_name}`);
        console.log(`✓ Dropped table: ${table.table_name}`);
      }
      
      // Re-enable foreign key checks
      await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
      
      console.log('✅ All tables dropped successfully');
      
    } catch (error) {
      console.error('❌ Failed to drop tables:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Reset database (drop and recreate)
   */
  async reset(): Promise<void> {
    await this.dropTables();
    await this.migrate();
  }

  /**
   * Check database status
   */
  async status(): Promise<void> {
    const connection = await pool.getConnection();
    
    try {
      console.log('📊 Database Status:');
      
      // Get table count
      const [tables] = await connection.execute(
        'SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = ?',
        [config.database.name]
      );
      
      console.log(`Tables: ${(tables as any[])[0].table_count}`);
      
      // Get user count
      try {
        const [users] = await connection.execute('SELECT COUNT(*) as user_count FROM users');
        console.log(`Users: ${(users as any[])[0].user_count}`);
      } catch {
        console.log('Users table not found');
      }
      
      // Get travel dates count
      try {
        const [dates] = await connection.execute('SELECT COUNT(*) as date_count FROM travel_dates');
        console.log(`Travel dates: ${(dates as any[])[0].date_count}`);
      } catch {
        console.log('Travel dates table not found');
      }
      
      // Get matches count
      try {
        const [matches] = await connection.execute('SELECT COUNT(*) as match_count FROM matches');
        console.log(`Matches: ${(matches as any[])[0].match_count}`);
      } catch {
        console.log('Matches table not found');
      }
      
    } catch (error) {
      console.error('❌ Failed to get database status:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

// CLI interface
async function main() {
  const migrator = new DatabaseMigrator();
  const command = process.argv[2];
  
  try {
    switch (command) {
      case 'migrate':
        await migrator.migrate();
        break;
      case 'drop':
        await migrator.dropTables();
        break;
      case 'reset':
        await migrator.reset();
        break;
      case 'status':
        await migrator.status();
        break;
      default:
        console.log('Usage: npm run migrate [migrate|drop|reset|status]');
        console.log('  migrate - Run database migrations');
        console.log('  drop    - Drop all tables');
        console.log('  reset   - Drop and recreate all tables');
        console.log('  status  - Show database status');
        process.exit(1);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export default DatabaseMigrator;
