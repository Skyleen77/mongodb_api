import DiscussionModel from '../models/discussion.js';

const Discussion = class Discussion {
  constructor(app, connect) {
    this.app = app;
    this.DiscussionModel = connect.model('Discussion', DiscussionModel);

    this.run();
  }

  get() {
    this.app.get('/discussion/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.DiscussionModel.findById(req.params.id).then((discussion) => {
          res.status(200).json(discussion || {});
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
    this.app.post('/discussion/', (req, res) => {
      try {
        const discussionModel = new this.DiscussionModel(req.body);

        discussionModel.save().then((discussion) => {
          res.status(200).json(discussion || {});
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

export default Discussion;