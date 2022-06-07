import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  send_by: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const messageSchema = new mongoose.Schema({
  send_by: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  comments: [commentSchema]
});



const Schema = new mongoose.Schema({
  link: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Link is required']
  },
  type_link: {
    type: String,
    enum: ['group', 'event'],
    required: [true, 'Type of link is required']
  },
  messages: [messageSchema]
}, {
  collection: 'discussions',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;