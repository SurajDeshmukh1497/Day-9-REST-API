# Day-9-REST-API
REST API , GET, POST; PATCH, DELETE
kill port
npm i -g kill-port
npx kill-port 3000


REST-API

GET/users - list of all users - Done

Dynamic Path parameters
GET /api/users/:id
:id -> Variable, Dynamic

GET/users/1 - list of user with ID 1 - Done
GET/users/2 - list of user with ID 2 - Done

POST /users - Create new users

//middleware (plugin) - very important
app.use(express.urlencoded({extended: false}));

PATCH/users - Edit the user with ID 1

DELETE/users - Delete the user with ID 1
