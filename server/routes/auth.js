const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.get("/", (req, res) =>{
    res.send("hey there")
})

router.post("/signup", (req, res) =>{
    const {name, email, password} = req.body
    if(!name || !email || !password)
    {
        return res.status(422).json({error: "Please enter all the fields"})
    }
    User.findOne({email:email})
        .then((savedUser) =>{
            if(savedUser)
            {
                return res.status(422).json({error: "user already exists"})
            }
            bcrypt.hash(password, 12)
            .then((hashedPassword) =>{
                const user = new User({
                    email,
                    password: hashedPassword,
                    name
                })
    
                user.save()
                .then(user =>{
                    res.json({message: "User saved successfully"})
                })
                .catch((err)=>{
                    console.log(err)
                })
            })     
        })
        .catch((err)=>{
            console.log(err)
        })
})


router.post("/signin", (req, res)=>{
    const {email, password} = req.body
    if(!email || !password)
    {
        return res.status(422).json({error:"enter proper email and password"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(422).json({error: "Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then((doMatch)=>{
            if(doMatch){
                // res.json({message:"signed in successfull"})
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                const {_id, name, email} = savedUser
                res.json({token:token, user:{_id, name, email}})
            }
            else{
                res.json({message: "invalid credentials"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
      
    })

})



module.exports = router