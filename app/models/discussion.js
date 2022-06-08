import mongoose from 'mongoose';

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
});

const Schema = new mongoose.Schema({
  link: {
    id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Link is required']
    },
    type: {
      type: String,
      enum: ['group', 'event', 'message'],
      required: [true, 'Type of link is required']
    }
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