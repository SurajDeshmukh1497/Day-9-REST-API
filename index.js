const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require('node:fs')
const app = express();
const port = 3000;

//middleware (plugin)
app.use(express.urlencoded({extended: false}));

//Routes

// GET/users - list of all users - Done
app.get('/users',(req, res)=> {
  return res.json(users)
});

// GET/users/1 - list of user with ID 1 - Done
app.get('/users/:id',(req,res)=>{
  const id = Number(req.params.id);
  const user = users.find((user)=> user.id == id);
  return res.json(user);
});

// POST /users - Create new users
app.post('/users',(req, res)=> {
  const body = req.body;
  console.log("Body", body);
  users.push({...body, id: users.length + 1});
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
  return res.json({status:"Success", id: users.length});
 });
});

// PATCH/users - Edit the user with ID 1
app.patch('/users/:id',(req, res)=> {
  //To do: Edit the user with id
  const id = Number(req.params.id);
  const user = users.find((user)=> user.id == id);
  const userIndex = users.indexOf(user)
  const body = req.body;
  console.log("Body", body);
  users.push(body);
  // return res.json({status:"pending"});
  if (user !== -1) {
    // users.splice(userIndex, 1);
    fs.appendFile("./MOCK_DATA.json",JSON.stringify(users),(err)=> {
    if (err){
      return res.json({status: "Error delete"});
    }
    return res.json({status:"Update Successful"});
    });
  }  else {
    return res.json({status:"User not found"});
  }
});

// DELETE/users - Delete the user with ID 1
app.delete('/users/:id',(req,res)=> {

  const id = Number(req.params.id);
  const user = users.find((user)=> user.id == id);
  const userIndex = users.indexOf(user);
  if (user !== -1) {
    users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=> {
    if (err){
      return res.json({status: "Error delete"});
    }
    return res.json({status:"Delete Successful"});
    });
  }  else {
    return res.json({status:"User not found"});
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
