const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    price: { type: Number, required: true, min: 0 }, // Ensure price is positive
    name: { type: String, required: true, trim: true, maxlength: 100, index: true }, // Trim whitespace & limit length
    description: { type: String, default: "" },
    detaildescription: { type: String, default: "" },
    
    // Validate image URLs
    image: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },
    effectimage: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },
    resultimage: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },
    sensationimage: { type: String, default: "", match: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i },
    
    // Rating field
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 }, // Trung bình rating (1-5)
      totalReviews: { type: Number, default: 0, min: 0 } // Tổng số lượt đánh giá
    }
  },
  { timestamps: true } // Automatically add createdAt & updatedAt
);

module.exports = mongoose.model("Service", serviceSchema);
