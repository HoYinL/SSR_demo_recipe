import mongoose from "mongoose";

let Schema = mongoose.Schema;

export default mongoose.model('AutoSaveBlog', new Schema({
    content: [String], 
    feature: {type: Schema.Types.ObjectId, ref: 'AutoSaveData'},
    createAt: Date,
    _id: Schema.Types.ObjectId,
}));