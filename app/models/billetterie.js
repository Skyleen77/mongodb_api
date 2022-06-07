import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event is required']
  },
  type_billet: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'TypeBillet',
      required: [true, 'Type billet is required']
    }
  ],
  billet_achete: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Billet',
      required: [true, 'Billet is required']
    }
  ]
}, {
  collection: 'billeteries',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete doc._id;
  }
});

export default Schema;