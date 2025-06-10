import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from './apollo/client';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Users from './components/Users';
import ProductDetail from './components/ProductDetail';
import UserDetail from './components/UserDetail';
import CreateProduct from './components/CreateProduct';
import CreateUser from './components/CreateUser';
import CreateFeedback from './components/CreateFeedback';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/create-feedback" element={<CreateFeedback />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App; 