import GroupModel from '../models/group.js';

const Group = class Group {
  constructor(app, connect) {
    this.app = app;
    this.GroupModel = connect.model('Group', GroupModel);

    this.run();
  }

  get() {
    this.app.get('/group/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.GroupModel.findById(req.params.id).then((group) => {
          res.status(200).json(group || {});
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
    this.app.post('/group/', (req, res) => {
      try {
        const groupModel = new this.GroupModel(req.body);

        groupModel.save().then((group) => {
          res.status(200).json(group || {});
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

export default Group;