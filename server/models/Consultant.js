const mongoose = require('mongoose');
const { Schema } = mongoose;
const consultantSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // The person giving the rating
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    note: { type: String },
    image: { type: String }
});

// Virtual field for average rating
consultantSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const avg = this.ratings.reduce((sum, r) => sum + r.rating, 0) / this.ratings.length;
    return avg.toFixed(1);
});

module.exports = mongoose.model("Consultant", consultantSchema);
