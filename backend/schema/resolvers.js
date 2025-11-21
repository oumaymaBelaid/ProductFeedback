const { User, Product, Feedback } = require('../models');

const resolvers = {
  Query: {
    getAllUsers: async () => await User.findAll(),
    getAllProducts: async () => await Product.findAll(),
    product: async (_, { id }) => await Product.findByPk(id),
    feedbacks: async () => await Feedback.findAll(),
    feedback: async (_, { id }) => await Feedback.findByPk(id),
    user: async (_, { id }) => await User.findByPk(id),
    getFeedbackByUser: async (_, { userId }) => await Feedback.findAll({ where: { UserId: userId } }),
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      const newUser = await User.create({ name, email });
      return newUser;
    },

    createProduct: async (_, { name, description }) => {
      const newProduct = await Product.create({ name, description });
      return newProduct;
    },

    createFeedback: async (_, { userId, productId, rating, comment }) => {
      console.log("Création feedback :", { userId, productId, rating, comment });
      const newFeedback = await Feedback.create({
        UserId: userId,
        ProductId: productId,
        rating,
        comment,
      });
      return newFeedback;
    },
  },

  Feedback: {
    user: async (feedback) => await User.findByPk(feedback.UserId),
    product: async (feedback) => await Product.findByPk(feedback.ProductId),
  },

  Product: {
    feedbacks: async (product) => await Feedback.findAll({ where: { ProductId: product.id } }),
    averageRating: async (product) => {
      const prodFeedbacks = await Feedback.findAll({ where: { ProductId: product.id } });
      if (prodFeedbacks.length === 0) return null;
      const total = prodFeedbacks.reduce((sum, f) => sum + f.rating, 0);
      return total / prodFeedbacks.length;
    }
  },

  User: {
    feedbacks: async (user) => await Feedback.findAll({ where: { UserId: user.id } }),
  }
};

module.exports = resolvers;
