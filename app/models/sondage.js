import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: [true, 'Answer is required']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  answers: [answerSchema]
});

const Schema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event is required']
  },
  questions: [questionSchema]
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