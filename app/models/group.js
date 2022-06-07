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
  icon: {
    type: String,
    require: [true, 'Icon is required']
  },
  cover_image: {
    type: String,
    require: [true, 'Cover image is required']
  },
  type: {
    type: String,
    enum: ['public', 'privé', 'secret'],
    require: [true, 'Type is required']
  },
  allow_posts: {
    type: Boolean,
    require: [true, 'Allow posts is required']
  },
  allow_events: {
    type: Boolean,
    require: [true, 'Allow events is required']
  },
  owner: [
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
  collection: 'groups',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;