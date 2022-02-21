const { Schema, model } = require("mongoose");

const translationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  translations: [
    {
      language: String,
      translation: String,
    },
  ],
});

exports.TranslationModel = model("Translation", translationSchema);
