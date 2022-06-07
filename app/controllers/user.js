import UserModel from '../models/user.js';

const User = class User {
  constructor(app, connect) {
    this.app = app;
    this.UserModel = connect.model('User', UserModel);

    this.run();
  }

  get() {
    this.app.get('/user/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.UserModel.findById(req.params.id).then((user) => {
          res.status(200).json(user || {});
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
    this.app.post('/user/', (req, res) => {
      try {
        const userModel = new this.UserModel(req.body);

        userModel.save().then((user) => {
          res.status(200).json(user || {});
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

export default User;