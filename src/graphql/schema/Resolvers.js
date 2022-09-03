const userModel = require("../../models/userModel");

const resolvers = {
  Query: {
    async getAllUsers() {
      return await userModel.find({});
    },
    async getUserById(parent, args) {
      const id = args.id;
      return await userModel.findById({ _id: id });
    },
  },
  Mutation: {
    async createUser(parent, args) {
      const newUser = args.user;
      const user = new userModel(newUser);
      const result = await user.save();
      return result;
    },
  },
};

module.exports = { resolvers };
