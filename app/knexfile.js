const dbHost = process.env.DB_HOST || 'localhost';

module.exports = {
    default: {
      host: dbHost,
      client: 'postgresql',
      connection: {
        database: 'postgres',
        user:     'postgres',
        password: 'admin'
      },
      migrations: {
        tableName: 'expense'
      }
    }
  };
  