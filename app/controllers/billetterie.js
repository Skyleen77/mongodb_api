import BilletterieModel from '../models/billetterie.js';

const Billetterie = class Billetterie {
  constructor(app, connect) {
    this.app = app;
    this.BilletterieModel = connect.model('Billetterie', BilletterieModel);

    this.run();
  }

  get() {
    this.app.get('/billetterie/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.BilletterieModel.findById(req.params.id).then((billetterie) => {
          res.status(200).json(billetterie || {});
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

  update() {
    this.app.put('/billetterie/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.BilletterieModel.updateOne({ _id: req.params.id }, { $set: req.body }).then((billetterie) => {
          res.status(200).json(billetterie || {});
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
    this.app.post('/billetterie/', (req, res) => {
      try {
        const billetterieModel = new this.BilletterieModel(req.body);

        billetterieModel.save().then((billetterie) => {
          res.status(200).json(billetterie || {});
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

  delete() {
    this.app.delete('/billetterie/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.BilletterieModel.deleteOne({ _id: req.params.id }).then((billetterie) => {
          res.status(200).json(billetterie || {});
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

  setBillet() {
    this.app.post('/billetterie/billet/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.BilletterieModel.findByIdAndUpdate(req.params.id, {
          $push: {
            billet_achete: req.body.billet_achete
          }
        }, { upsert: true }).then((billetterie) => {
          res.status(200).json(billetterie || {});
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
    this.update();
    this.delete();
    this.setBillet();
  }
}

export default Billetterie;