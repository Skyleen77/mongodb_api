// Dependencies
import express from 'express';
import mongoose from 'mongoose';

// Dependencies middleware
import bodyParser from 'body-parser';

// Core
import config from './config.js';
import routes from './controllers/routes.js';

class Server {
  constructor() {
    this.app = express();
    this.config = config[process.argv[2]] || config.development;
  }

  dbConnect() {
    const { mongodb } = this.config;
    const connect = mongoose.createConnection(mongodb);

    connect.on('error', (err) => {
      setTimeout(() => {
        console.log('[ERROR] api dbConnect( -> mongodb error');
        this.connect = this.dbConnect(mongodb);
      }, 5000);

      console.error(`[ERROR] api dbConnect() -> ${err}`);
    });

    connect.on('disconnected', (err) => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect( -> mongodb disconnected');
        this.connect = this.dbConnect(mongodb);
      }, 5000);
    });

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection');
        process.exit(0);
      });
    });

    return connect;
  }
  
  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    new routes.User(this.app, this.connect);
    new routes.Event(this.app, this.connect);
    new routes.Group(this.app, this.connect);
    new routes.Discussion(this.app, this.connect);
    new routes.Album(this.app, this.connect);
    new routes.Sondage(this.app, this.connect);
    new routes.TypeBillet(this.app, this.connect);
    new routes.Billet(this.app, this.connect);
    new routes.Billetterie(this.app, this.connect);
    
    this.app.use((req, res) => {
      res.status(404).json({
        code: 404,
        message: 'Not Found'
      });
    });
  }

  run() {
    try {
      this.connect = this.dbConnect();
      this.middleware();
      this.routes();
      this.app.listen(this.config.port);
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`);
    }
  }
}

export default Server;