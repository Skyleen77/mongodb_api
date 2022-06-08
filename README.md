# My Social Networks API

## Dependencies
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)

## Configuration
To install and set up the development environment, run this command in your terminal :

`npm install`

To configure your MongoDB go to `config.js`
Go to the  file at the root of your project. 
And fill in your own url that corresponds to your mongoDB. 



```javascript
const config = {
  development: {
    port: 3000,
    mongodb: 'mongodb://localhost:27017/yourDatabaseName'
  },
  production: {
    port: 3000,
    mongodb: 'mongodb://localhost:27017/yourDatabaseName'
  }
}
```