require("dotenv").config();
const TuShare = require("tushare-js");
const { faker } = require("@faker-js/faker");
const userModel = require("../../models/userModel");
const hsBasicModel = require("../../models/hsBasicModel");

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
    async createHSBasic(parent, args) {
      let newUser = args.user;

      const { TUSHARE_HOST, TUSHARE_TOKEN } = process.env;
      const ts = TuShare(TUSHARE_TOKEN,TUSHARE_HOST);
      const res= await ts.query({
        api_name:'stock_basic',
        fields: ["ts_code", "symbol", "name", "area", "industry", "fullname", "enname", "cnspell", "market","exchange", "curr_type", "list_status", "list_date", "delist_date", "is_hs"]
      })
      
      console.log(res)

      newUser = res.data.items[0]

      const hsBasic = new hsBasicModel(newUser);
      const result = await hsBasic.save();
      return result;
    },
  },
};

module.exports = { resolvers };
