const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_150');
});

const opts = {toJSON: {virtuals: true}};

const StationSchema = new Schema({
    location: String,
    images: [ImageSchema],
    date: String,
    haveMap: String,
    train: String,
    description: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required : true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

StationSchema.virtual('properties.popUpMarkup').get(function() {
    return `
    <strong><a href="/stations/${this._id}">${this.location}</a></strong>
    <p>${this.date}</p>
    <img src="{this.images[this.images.length - 1].url}" style="width:200px;height:200px;">
    `
});

module.exports = mongoose.model('Station', StationSchema);