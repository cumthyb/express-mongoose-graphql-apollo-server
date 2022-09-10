const mongoose = require("mongoose");

const hsBasicSchema = new mongoose.Schema(
  {
    ts_code: {
      type: String,
      unique: true,
      required: true,
    },
    symbol: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
    fullname: {
      type: String,
      required: false,
    },
    enname: {
      type: String,
      unique: true,
      required: false,
    },
    cnspell: {
      type: String,
      required: false,
    },
    market: {
      type: String,
      required: false,
    },
    exchange: {
      type: String,
      required: false,
    },
    curr_type: {
      type: String,
      required: false,
    },
    list_status: {
      type: String,
      required: false,
    },
    list_date: {
      type: String,
      required: false,
    },
    delist_date: {
      type: String,
      required: false,
    },
    is_hs: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timeseries: true,
  }
);

module.exports = mongoose.model("HSBasic", hsBasicSchema);
