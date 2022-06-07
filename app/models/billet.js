import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'TypeBillet',
    required: [true, 'Type billet is required']
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required']
  },
  firstname: {
    type: String,
    required: [true, 'Firstname is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  }
}, {
  collection: 'billets',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;