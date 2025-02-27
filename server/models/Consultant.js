const mongoose = require('mongoose');
const { Schema } = mongoose;

const consultantSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    note: { type: String },
    image: { type: String }
}, { timestamps: true });

// Virtual field for average rating
consultantSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const avg = this.ratings.reduce((sum, r) => sum + r.rating, 0) / this.ratings.length;
    return parseFloat(avg.toFixed(1));
});

// Prevent duplicate ratings from the same user
consultantSchema.methods.addRating = async function (userId, rating, comment) {
    const existingRating = this.ratings.find(r => r.user.toString() === userId.toString());

    if (existingRating) {
        existingRating.rating = rating;
        existingRating.comment = comment;
        existingRating.createdAt = new Date();
    } else {
        this.ratings.push({ user: userId, rating, comment });
    }

    return this.save();
};

module.exports = mongoose.model("Consultant", consultantSchema);