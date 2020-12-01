const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.post('/createpost',requireLogin, (req,res)=>{
    const {title, body, pic} = req.body
    console.log(req.body)
    console.log(title, body, pic)
    if(!title || !body )
    {
        return res.status(422).json({error: "post cant be created"})
    }
    req.user.password = undefined
    const post = new Post({
        title:title,
        body:body,
        photo:pic,
        postedBy:req.user
    })
    post.save()
    .then(result =>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/allpost', requireLogin, (req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    //based on timestamp
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts:posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost', requireLogin, (req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost:mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.put('/like',requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
        //updated record
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else
        {
            res.json(result)
        }
    })
})


router.put('/dislike',requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
        //updated record
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else
        {
            res.json(result)
        }
    })
})


router.put('/comment',requireLogin, (req,res)=>{
    const comment ={
        text:req.body.text,
        postedBy: req.user
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
        //updated record
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else
        {
            res.json(result)
        }
    })
})

//router.delete('/deletepost:postId',requireLogin, (req,res)=>{
    //Post.findOne({_id:req.params.postId})
    //.populate("postedBy","_id")
    //populate("postedBy","id")
    //.exec((err,post)=>{
      //  if(err || !post)
       // {
          //  res.status(422).json({error:err})
      //  }
       // if(post.postedBy._id.toString() === req.user._id.toString())
       // {
         //   post.remove()
         //   .then(result=>{
          //      res.json(result)
         //   }).catch(err=>{
          //      console.log(err)
    //   })
     ///   }
    //})
//})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})


router.get('/followedposts', requireLogin, (req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts:posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router