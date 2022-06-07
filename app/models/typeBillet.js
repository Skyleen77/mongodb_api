import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  montant: {
    type: Number,
    required: [true, 'Montant is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  extern_user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
}, {
  collection: 'types_billets',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;