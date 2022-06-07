import BilletModel from '../models/billet.js';

const Billet = class Billet {
  constructor(app, connect) {
    this.app = app;
    this.BilletModel = connect.model('Billet', BilletModel);

    this.run();
  }

  get() {
    this.app.get('/billet/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.BilletModel.findById(req.params.id).then((billet) => {
          res.status(200).json(billet || {});
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
    this.app.post('/billet/', (req, res) => {
      try {
        const billetModel = new this.BilletModel(req.body);

        billetModel.save().then((billet) => {
          res.status(200).json(billet || {});
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

export default Billet;