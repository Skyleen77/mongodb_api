import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'Comment is required']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
});

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  comments: [commentSchema]
});

const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is required']
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event is required']
  },
  images: [imageSchema]
}, {
  collection: 'albums',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;