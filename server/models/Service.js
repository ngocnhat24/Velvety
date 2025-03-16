const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    price: { type: Number, required: true, min: 0 },
    name: { type: String, required: true, trim: true, maxlength: 100, index: true },
    description: { type: String, default: "" },
    detaildescription: { type: String, default: "" },

    image: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },
    effectimage: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },
    resultimage: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },
    sensationimage: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },

    // Rating field
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      totalReviews: { type: Number, default: 0, min: 0 }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
