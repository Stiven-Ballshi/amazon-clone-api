const { match } = require("assert");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShippingSchema = new Schema({
  address: {
    type: String,
    required: true,
    match: /\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  additionalInformation: {
    type: String,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    match: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
  },
});
