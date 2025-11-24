// const express = require('express')
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
// const app = express()
// const port = 3001

// app.use(bodyParser.json()) 

// mongoose.connect('mongodb://localhost:27017/users', {
//     useNewUrlParser: true,
//     userUnifiedTopology: true,

// }).then(()=> console.log('Connected to mongoDB'))
// .catch(err => console.error("MongoDB conntect fail", err))

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// const User = mongoose.model('User', UserSchema);

// app.get('/', (req, res) => {
//   res.send('Hello World!, Day 1, Microservices')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/users')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connect fail', err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', UserSchema);

app.get('/users', async (req, res) =>{
    const users = await User.find();
    res.json(users)
})

app.post('/users', async(req, res) => {
    const {name, email} = req.body;

    try{
        const user = new User({name, email});
        await user.save();
        res.status(201).json(user);
    }catch(error){
        console.error('Error saving', error);
        res.status(500).json({error: "Internal server error"})
    }
});

app.get('/', (req, res) => {
  res.send('Hello World!, Day 1, Microservices');
});

app.listen(port, () => {
  console.log(`User app listening on port ${port}`);
});
