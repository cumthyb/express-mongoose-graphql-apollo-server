require("dotenv").config();
const TuShare = require("tushare-js").default;
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
    async getHSBasic(parent, args) {
      const option = {};
      if (args) {
        console.log(args);
        const { field, value } = args;
        option[field] = value;
      }
      return await hsBasicModel.find(option);
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

      const { TUSHARE_TOKEN } = process.env;
      const ts = TuShare(TUSHARE_TOKEN);
      const res = await ts.query({
        api_name: "stock_basic",
        // params: { limit: "2" },
        fields: [
          "ts_code",
          "name",
          "symbol",
          "area",
          "industry",
          "fullname",
          "enname",
          "cnspell",
          "market",
          "exchange",
          "curr_type",
          "list_status",
          "list_date",
          "delist_date",
          "is_hs",
        ],
      });
      let _all = [];
      for (var i = 0; i < res.data.length; i++) {
        const _stock = res.data[i];
        const _hsBasic = new hsBasicModel(_stock);
        _all.push(await _hsBasic.save());
      }
      return _all;
    },
  },
};

module.exports = { resolvers };
