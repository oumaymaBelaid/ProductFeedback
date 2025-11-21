const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres' // Connect to default database to create the new one
});

async function createDatabase() {
  try {
    await client.connect();
    await client.query('CREATE DATABASE productfeedback;');
    console.log('Base de données "productfeedback" créée avec succès.');
  } catch (err) {
    if (err.code === '42P04') {
      console.log('La base de données "productfeedback" existe déjà.');
    } else {
      console.error('Erreur lors de la création de la base de données:', err.message);
    }
  } finally {
    await client.end();
  }
}

createDatabase();
