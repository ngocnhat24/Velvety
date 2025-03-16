const mongoose = require('mongoose');
 const { Schema } = mongoose;
 
 const consultantSchema = new Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     ratings: [{
         user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
         rating: { type: Number, required: true, min: 1, max: 5 },
         comment: { type: String },
         createdAt: { type: Date, default: Date.now }
     }],
     avgRating: { type: Number, default: 0, min: 0, max: 5 }, // Lưu vào DB để truy vấn nhanh hơn
     totalReviews: { type: Number, default: 0, min: 0 }, // Tổng số lượt đánh giá
     note: { type: String },
     image: { type: String }
 }, { timestamps: true });

module.exports = mongoose.model("Consultant", consultantSchema);
