import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is required']
  },
  description: {
    type: String,
    require: [true, 'Description is required']
  },
  start_date: {
    type: Date,
    require: [true, 'Start date is required']
  },
  end_date: {
    type: Date,
    require: [true, 'End date is required']
  },
  place: {
    type: String,
    require: [true, 'Place is required']
  },
  cover_image: {
    type: String,
    require: [true, 'Cover image is required']
  },
  public: {
    type: Boolean,
    default: false,
    require: [true, 'Public is required']
  },
  organizers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  collection: 'events',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;