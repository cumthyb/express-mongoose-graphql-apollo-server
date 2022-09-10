const { faker } = require("@faker-js/faker");
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
      let newUser = args.user;
      let { lastName, name, email, password, status } = newUser;
      name = name || faker.name.fullName({ lastName: lastName || "Trump" });
      email = email || faker.internet.email();
      password = password || faker.internet.password();
      status = status || false;
      newUser = { name, email, password, status };

      const user = new userModel(newUser);
      const result = await user.save();
      return result;
    },
  },
};

module.exports = { resolvers };
