const { users, products, feedbacks } = require('./data');
const { v4: uuidv4 } = require('uuid');

const resolvers = {
  Query: {
    getAllUsers: () => users,
    getAllProducts: () => products,
    getProduct: (_, { id }) => products.find(p => p.id === id),
    getFeedbackByProduct: (_, { productId }) => feedbacks.filter(f => f.productId === productId),
    getFeedbackByUser: (_, { userId }) => feedbacks.filter(f => f.userId === userId),
    getAllFeedbacks: () => feedbacks,
    

  },

  Mutation: {
    createUser: (_, { name, email }) => {
      const newUser = { id: uuidv4(), name, email };
      users.push(newUser);
      return newUser;
    },

    createProduct: (_, { name, description }) => {
      const newProduct = { id: uuidv4(), name, description };
      products.push(newProduct);
      return newProduct;
    },

    createFeedback: (_, { userId, productId, rating, comment }) => {
  console.log("Création feedback :", { userId, productId, rating, comment });
      const newFeedback = {
        id: uuidv4(),
        userId,
        productId,
        rating,
        comment,
        date: new Date().toISOString()
      };
      feedbacks.push(newFeedback);
      return newFeedback;
    },
  },

  Feedback: {
  user: (feedback) => {
    const user = users.find(u => u.id === feedback.userId);
    if (!user) {
      console.warn(`Utilisateur introuvable pour userId: ${feedback.userId}`);
    }
    return user;
  },
  product: (feedback) => products.find(p => p.id === feedback.productId),
},


  Product: {
    feedbacks: (product) => feedbacks.filter(f => f.productId === product.id),
    averageRating: (product) => {
      const prodFeedbacks = feedbacks.filter(f => f.productId === product.id);
      if (prodFeedbacks.length === 0) return null;
      const total = prodFeedbacks.reduce((sum, f) => sum + f.rating, 0);
      return total / prodFeedbacks.length;
    }
  },

  User: {
    feedbacks: (user) => feedbacks.filter(f => f.userId === user.id),
  }
  
};

module.exports = resolvers;
