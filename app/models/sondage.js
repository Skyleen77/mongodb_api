import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  anwsers: [
    {
      type: String
    }
  ]
});

const Schema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event is required']
  },
  questions: [questionSchema],
  user_answer: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  collection: 'sondages',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;