// schema/data.js
const { v4: uuidv4 } = require('uuid');

const users = [
  { id: uuidv4(), name: 'houssem', email: 'houssem@example.com' },
  { id: uuidv4(), name: 'hbs', email: 'hbs@example.com' },
  { id: uuidv4(), name: 'houss', email: 'houss@example.com' },
];

const products = [
  { id: uuidv4(), name: 'Produit 1', description: 'Description 1' },
  { id: uuidv4(), name: 'Produit 2', description: 'Description 2' },
  { id: uuidv4(), name: 'Produit 3', description: 'Description 3' },
];

const feedbacks = [];

module.exports = { users, products, feedbacks };
