const mongoose = require("mongoose");

const hsBasicSchema = new mongoose.Schema(
  {
    ts_code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    enname: {
      type: String,
      required: true,
    },
    cnspell: {
      type: String,
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    exchange: {
      type: String,
      required: true,
    },
    curr_type: {
      type: String,
      required: true,
    },
    list_status: {
      type: String,
      required: true,
    },
    list_date: {
      type: String,
      required: true,
    },
    delist_date: {
      type: String,
      required: true,
    },
    is_hs: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timeseries: true,
  }
);

module.exports = mongoose.model("HSBasic", hsBasicSchema);
