const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
//pwd : L0uF0dvrx81udHpb
const { MONGOURI } = require("./keys")

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log("DB connected");
})

mongoose.connection.on('error', (err) =>{
    console.log(err);
})

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

app.listen(PORT, () =>{
    console.log("server running");
})

