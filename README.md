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

## Features

### - [User](#user-collection-user)
### - [Group](#group-collection-group)
### - [Event](#event-collection-event)
### - [Album](#album-collection-album)
### - [Discussion](#discussion-collection-discussion)
### - [Sondage](#sondage-collection-sondage)
### - [Billetterie](#billetterie-collection-billetterie)

## User collection [/user]

### Structure

- _id: ObjectId
- firstname: String (required)
- lastname: String (required)
- age: String (required)
- password: String (required, minlength: 8)
- Email: String (required, unique)

### Create [POST]

Request URL :
```
http://localhost:3000/user
```

Body example :
```json
{
  "firstname": "elliot",
  "lastname": "sutton",
  "age": 32,
  "password": "12345345",
  "email": "elsk8@outlook.fr"
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/user/:id
```

### Update [PUT]

Request URL :
```
http://localhost:3000/user/:id
```

Body example :
```json
{
  "firstname": "florian",
  "lastname": "barraud",
  "age": 27,
  "password": "12345345",
  "email": "florian.barraud@gmail.com"
}
```

### Delete [DELETE]

Request URL :
```
http://localhost:3000/user/:id
```

## Group collection [/group]

### Structure

- _id: ObjectId
- name: String (required)
- description: String (required)
- icon: String (required)
- cover_image: String (required)
- type: String (required, enum: ['privé', 'public', 'secret'])
- allow_posts: Boolean (required)
- allow_events: Boolean (required)
- owner: [User]
- members: [User]

### Create [POST]

Request URL :
```
http://localhost:3000/group
```

Body example :
```json
{
    "name": "groupY",
    "description": "group test",
    "icon": "https://test.com/icons/test.png",
    "cover_image": "https://test.com/images/test.png",
    "type": "privé",
    "allow_posts": true,
    "allow_events": false,
    "owner": [
        "6290d9e743550e139005b81f"
    ],
    "members": [
        "6290d9e743550e139005b81f"
    ]
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/group/:id
```

### Update [PUT]

Request URL :
```
http://localhost:3000/group/:id
```

Body example :
```json
{
    "name": "groupYdccf",
    "description": "group  vrttgdggd",
    "icon": "https://test.com/icons/test.png",
    "cover_image": "https://test.com/images/test.png",
    "type": "public",
    "allow_posts": false,
    "allow_events": true,
    "owner": [
        "6290d9e743550e139005b81f"
    ],
    "members": [
        "6290d9e743550e139005b81f"
    ]
}
```

### Delete [DELETE]

Request URL :
```
http://localhost:3000/group/:id
```