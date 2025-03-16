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
    avgRating: { type: Number, default: 0, min: 0, max: 5 }, // Lưu vào DB để truy vấn nhanh hơn
    totalReviews: { type: Number, default: 0, min: 0 }, // Tổng số lượt đánh giá
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
