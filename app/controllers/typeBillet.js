import TypeBilletModel from '../models/typeBillet.js';

const TypeBillet = class TypeBillet {
  constructor(app, connect) {
    this.app = app;
    this.TypeBilletModel = connect.model('TypeBillet', TypeBilletModel);

    this.run();
  }

  get() {
    this.app.get('/typebillet/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.TypeBilletModel.findById(req.params.id).then((typebillet) => {
          res.status(200).json(typebillet || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        });
      }
    })
  }

  create() {
    this.app.post('/typebillet/', (req, res) => {
      try {
        const typeBilletModel = new this.TypeBilletModel(req.body);

        typeBilletModel.save().then((typebillet) => {
          res.status(200).json(typebillet || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        });
      }
    })
  }

  run() {
    this.get();
    this.create();
  }
}

export default TypeBillet;