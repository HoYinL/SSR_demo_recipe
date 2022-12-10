import mongoose from "mongoose";

let Schema = mongoose.Schema;

export default mongoose.model('PublishedPost', new Schema({
    content: [String], 
    feature: {type: Schema.Types.ObjectId, ref: 'PublishedFeatures'},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createAt: Date,
    commentList: {type: Schema.Types.ObjectId, ref: 'PostCommentList'},
    bookmarked: Number,
    _id: Schema.Types.ObjectId,
}));