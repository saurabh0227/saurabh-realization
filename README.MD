## Getting Started

### Installation

1. install the dependencies using `npm install` or `npm i`

2. Rename the file `.env.example` to `.env`, then you need to configure the file `config.js` located in `src/config`

3. Start the app using `npm start` on production

4. Start the app using `npm run dev` on local

### Directory Structure

```
├── src
│   ├── apiV1
|   |   ├── audience
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── route.js
│   │   ├── auth
│   │   │   ├── controller.js
|   |   ├── classes
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── route.js
│   │   ├── reports
│   │   │   ├── controller.js
│   │   │   └── route.js
│   │   ├── users
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── route.js
│   │   └── index.js
│   ├── config
│   │   ├── config.js
│   │   └── db.js
│   │   └── socket.js
│   ├── swagger
│   │   ├── route.js
│   │   ├── swagger.json
│   └── index.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
```

### Available routes

| Method | Resource                                           | Description                                                                                                                                      |
| :----- | :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------------------------------------------------------- | --- |
| `POST` | `/v1/users/signup`                                 | Create a new user in the DB. You need to specify in the body the following attributes: role, username & password.                                |
| `POST` | `/v1/users/login`                                  | Sign in with the username & password. If it's successful, then generates a token                                                                 |
| `POST` | `/v1/classes/create`                               | To insert class in db                                                                                                                            | DB  | You need to specify the token in the header with the following format: `authorization: your-token` | DB. |
| `PUT`  | `/v1/classes/startClass/:classId`                  | To start a class                                                                                                                                 | DB  | You need to specify the token in the header with the following format: `authorization: your-token` | DB. |
| `GET`  | `/v1/classes/fetchClassByTeacher?teacherId=123456` | It returns the active classes as per teacher. You need to specify the token in the header with the following format: `authorization: your-token` | DB  |
| `GET`  | `/v1/classes/fetchClasses`                         | It returns the list of all active classes. You need to specify the token in the header with the following format: `authorization: your-token`    | DB  |
| `PUT`  | `/v1/classes/endClass/:classId`                    | To end a class. You need to specify the token in the header with the following format: `authorization: your-token`                               | DB  |
| `POST` | `/v1/audiences/joinClass`                          | To join an active class note. You need to specify the token in the header with the following format: `authorization: your-token`                 | DB  |
| `PUT`  | `/v1/audiences/leaveClass`                         | To leave an active class note. You need to specify the token in the header with the following format: `authorization: your-token`                | DB  |
| `GET`  | `/v1/reports/classReport?classId=123456`           | To fetch report using classId. You need to specify the token in the header with the following format: `authorization: your-token`                | DB  |

### Potman collection URL

https://www.getpostman.com/collections/6558a85671034cd43569
