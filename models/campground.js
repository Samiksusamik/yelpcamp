const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

// Campground Schema
const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Delete all reviews of deleted campgrounds
CampgroundSchema.post('findOneAndDelete', async doc => {
    if(doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);