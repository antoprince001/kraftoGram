const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')
//api integration stuff
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))
router.get("/", (req, res) =>{
    res.send("hey there")
})


router.post("/signup", (req, res) =>{
    const {name, email, password, about, pic, role} = req.body
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
                    name,
                    about,
                    pic:pic,
                    role
                })
    
                user.save()
                .then(user =>{
                    transporter.sendMail({
                        to:user.email,
                        from:"cunningpandacrafto@gmail.com",
                        subject:"Successfully signed in",
                        html:"<h2> Account creation successful !!! </h2>"
                    })
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
                const {_id, name, email,followers, following, pic, about, role} = savedUser
                res.json({token:token, user:{_id, name, email, followers, following, pic, about, role}})
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


router.post('/resetPassword',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err)
        {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user)
            {
                return res.status(422).json({error:"User does not exists"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000 
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"cunningpandacrafto@gmail.com",
                    subject:"Reset your password",
                    html:
                    `<h3> You have requested for a password change </h3>
                    <h5> Click <a href="http://localhost:3000/resetPassword/${token}">here</a> to change your password`
                })
                res.json({message:"Check your mail to receive reset link"})
            })
        })
    })
})


router.post('/newPassword',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken, expireToken:{
        $gt:Date.now()
    }})
    .then(user=>{
        if(!user)
        {
            return res.status(422).json({error:"Oops ! Token expired, Try again"})
        }
        bcrypt.hash(newPassword,12).then(hashedPassword=>{
            user.password = hashedPassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save()
            .then((savedUser)=>{
                res.json({message:"Password reset successful"})
            })
        })
    }).catch(err=>{
        console.log(err)
    })

})


module.exports = router