const { Schema, model } = require("mongoose");

const wordSchema = new Schema({
  user: {
    type: Schema.Types.objectId,
    ref: "User",
  },
  translations: [
    {
      language: String,
      value: String,
    },
  ],
});

exports.WordModel = model("Word", wordSchema);
