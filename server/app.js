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
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, () =>{
    console.log("server running");
})

