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
### - [TypeBillet](#typebillet-collection-typebillet)
### - [Billet](#billet-collection-billet)
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

### Set Members [POST]

Request URL :
```
http://localhost:3000/group/member/:id
```

Body example :
```json
{
    "members": [
        "629f1f0509fdac22e765aa74",
        "6290d9e743550e139005b81f"
    ]
}
```

## Event collection [/event]

### Structure

- _id: ObjectId
- name: String (required)
- description: String (required)
- start_date: Date (required)
- end_date: Date (required)
- place: String (required)
- cover_image: String (required)
- public: Boolean (required, default: false)
- organizers: [User]
- members: [User]

### Create [POST]

Request URL :
```
http://localhost:3000/event
```

Body example :
```json
{
    "name": "eventX",
    "description": "event test",
    "start_date": "2012-04-23T18:25:43.511Z",
    "end_date": "2012-04-23T18:25:43.511Z",
    "place": "Melun",
    "cover_image": "test_image",
    "public": true,
    "organizers": [
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
http://localhost:3000/event/:id
```

### Update [PUT]

Request URL :
```
http://localhost:3000/event/:id
```

Body example :
```json
{
    "name": "eventXEG86YUG",
    "description": "event test12345",
    "start_date": "2012-04-23T18:25:43.511Z",
    "end_date": "2012-04-23T18:25:43.511Z",
    "place": "Paris",
    "cover_image": "test_imageE455",
    "public": false,
    "organizers": [
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
http://localhost:3000/event/:id
```

### Set Member [POST]

Request URL :
```
http://localhost:3000/event/member/:id
```

Body example :
```json
{
    "members": [
        "629f1f0509fdac22e765aa74",
        "6290d9e743550e139005b81f"
    ]
}
```

## Album collection [/album]

### Structure

- _id: ObjectId
- name: String (required)
- event: Event (required)
- images: [
  {
    - _id: ObjectId
    - image: String (required)
    - user: User (required)
    - comments: [
      {
        - _id: ObjectId
        - comment: String (required)
        - user: User (required)
      }
    ]
  }
]

### Create [POST]

Request URL :
```
http://localhost:3000/album
```

Body example :
```json
{
    "name": "albumZ",
    "event": "629c702496ba7fb213248db7",
    "images": [
        {
            "image": "https://test.com/images/test.png",
            "user": "6290d9e743550e139005b81f",
            "comments": [
                {
                    "comment": "test comment",
                    "user": "6290d9e743550e139005b81f"
                }
            ]
        }
    ]
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/album/:id
```

### Update [PUT]

Request URL :
```
http://localhost:3000/album/:id
```

Body example :
```json
{
    "name": "albumZdscereaferqrz",
    "event": "629c702496ba7fb213248db7",
    "images": [
        {
            "image": "https://test.com/images/test.png",
            "user": "6290d9e743550e139005b81f",
            "comments": [
                {
                    "comment": "test comment efzrr",
                    "user": "6290d9e743550e139005b81f"
                },
                {
                    "comment": "test comment",
                    "user": "6290d9e743550e139005b81f"
                }
            ]
        }
    ]
}
```

### Delete [DELETE]

Request URL :
```
http://localhost:3000/album/:id
```

### Set Images [POST]

Request URL :
```
http://localhost:3000/album/image/:id
```

Body example :
```json
{
    "images": [
        {
            "image": "https://test.com/images/test.png",
            "user": "629f1f0509fdac22e765aa74",
            "comments": [
                {
                    "comment": "comment testtt",
                    "user": "6290d9e743550e139005b81f"
                }
            ]
        }
    ]
}
```

### Set Comment [POST]

Request URL :
```
http://localhost:3000/album/image/:id/comment/:idImage
```

Body example :
```json
{
    "comment": "un commentaire",
    "user": "629f543d0deeb65d928c5b68"
}
```

## Discussion collection [/discussion]

### Structure

- _id: ObjectId
- link: {
  - id: ObjectId (required)
  - type: String (required)
}
- messages: [
  {
    - _id: ObjectId
    - send_by: ObjectId (required)
    - message: String (required)
    - date: Date (required, default: Date.now())
  }
]

### Create [POST]

Request URL :
```
http://localhost:3000/discussion
```

Body example :
```json
{
    "link": {
        "id": "629c6fb096ba7fb213248db5",
        "type": "group"
    },
    "messages": [
        {
            "send_by": "6290d9e743550e139005b81f",
            "message": "message test",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/discussion/:id
```

### Update [PUT]

Request URL :
```
http://localhost:3000/discussion/:id
```

Body example :
```json
{
    "link": {
        "id": "629f4a97159f7079219d67e2",
        "type": "message"
    },
    "messages": [
        {
            "send_by": "6290d9e743550e139005b81f",
            "message": "message test du message",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
}
```

### Delete [DELETE]

Request URL :
```
http://localhost:3000/discussion/:id
```

### Set Message [POST]

Request URL :
```
http://localhost:3000/discussion/message/:id
```

Body example :
```json
{
    "send_by": "6290d9e743550e139005b81f",
    "message": "un message test"
}
```

## Sondage collection [/sondage]

### Structure

- _id: ObjectId
- event: ObjectId (required)
- questions: [
  {
    - _id: ObjectId
    - question: String (required)
    - answers: [
      {
        - _id: ObjectId
        - answer: String (required)
        - user: User (required)
      }
    ]
  }
]

### Create [POST]

Request URL :
```
http://localhost:3000/sondage
```

Body example :
```json
{
    "event": "629c702496ba7fb213248db7",
    "questions": [
        {
            "question": "Question ?",
            "answers": [
                {
                    "answer": "test answer",
                    "user": "6290d9e743550e139005b81f"
                }
            ]
        },
        {
            "question": "Question 2 ?",
            "answers": [
                {
                    "answer": "test answer 2",
                    "user": "6290d9e743550e139005b81f"
                }
            ]
        }
    ]
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/sondage/:id
```

### Update [PUT]

Request URL :
```
http://localhost:3000/sondage
```

Body example :
```json
{
    "event": "629c702496ba7fb213248db7",
    "questions": [
        {
            "question": "Question ?",
            "answers": [
                {
                    "answer": "test answer",
                    "user": "6290d9e743550e139005b81f"
                }
            ]
        }
    ]
}
```

### Delete [DELETE]

Request URL :
```
http://localhost:3000/sondage/:id
```

### Set Answer [POST]

Request URL :
```
http://localhost:3000/sondage/question/:id/answer/:idQuestion
```

Body example :
```json
{
    "answer": "Une reponse 12345",
    "user": "629f1f0509fdac22e765aa74"
}
```

## TypeBillet collection [/typebillet]

### Structure

- _id: ObjectId
- name: String (required)
- montant: Number (required)
- quantity: Number (required)
- extern_user: ObjectId (required)

### Create [POST]

Request URL :
```
http://localhost:3000/typebillet
```

Body example :
```json
{
    "name": "VIP",
    "montant": 35,
    "quantity": 10,
    "extern_user": "6290d9e743550e139005b81f"
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/typebillet/:id
```

## Billet collection [/billet]

### Structure

- _id: ObjectId
- type: ObjectId (required)
- lastname: String (required)
- firstname: String (required)
- address: String (required)
- date: Date (required)

### Create [POST]

Request URL :
```
http://localhost:3000/billet
```

Body example :
```json
{
    "type": "629c760819a5b671870ea7ad",
    "lastname": "Sutton",
    "firstname": "Elliot",
    "address": "63 av ...",
    "date": "2012-04-23T18:25:43.511Z"
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/billet/:id
```

## Billetterie collection [/billetterie]

### Structure

- _id: ObjectId
- event: ObjectId (required)
- type_billet: [TypeBillet] (required)
- billet_achete: [Billet] (required)

### Create [POST]

Request URL :
```
http://localhost:3000/billetterie
```

Body example :
```json
{
    "event": "629c702496ba7fb213248db7",
    "type_billet": [
        "629c76e8197ee7596fce558d"
    ],
    "billet_achete": [
        "629c779b197ee7596fce5591"
    ]
}
```

### Get [GET]

Request URL :
```
http://localhost:3000/billetterie/:id
```

### Update [PUT]

Request URL :
```
http://localhost:3000/billetterie/:id
```

Body example :
```json
{
    "event": "629c702496ba7fb213248db7",
    "type_billet": [
        "629c76e8197ee7596fce558d"
    ],
    "billet_achete": [
        "629c779b197ee7596fce5591"
    ]
}
```

### Get [DELETE]

Request URL :
```
http://localhost:3000/billetterie/:id
```

### Set Billet [POST]

Request URL :
```
http://localhost:3000/billetterie/billet/:id
```

Body example :
```json
{
    "billet_achete": [
        "62a06442be431e143ca35416"
    ]
}
```