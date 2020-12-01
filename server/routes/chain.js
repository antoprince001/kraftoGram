const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')
const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const { rpcURL,account,abi,contractAddress,private_key, } = require("../keys")

const web3 = new Web3(rpcURL)
const contract = new web3.eth.Contract(abi, contractAddress)



router.get("/chain", (req, res) =>{
    res.send("hey there!")
})


router.post("/addcraft",requireLogin,(req,res)=>{

    if(!req.body.name){
        return res.status(422).json({error: "Please enter all fields"})
    }
    
    web3.eth.getTransactionCount(account, (err, txCount) => {
        console.log(txCount)
        const txObject = {
            //nonce:    web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            to: contractAddress,
            data: contract.methods.addItem(req.user.email, req.body.name,(new Date()).toString()).encodeABI(),
        }
    
    
    web3.eth
    .accounts
    .signTransaction(txObject, private_key)
    .then(function(value){
    
      web3.eth
        .sendSignedTransaction(value.rawTransaction)
        .then(function(response){
            contract.getPastEvents(
                'Added',
                {
                  fromBlock: 22335088,
                  toBlock: 'latest'
                },
                (err, events) => { return res.json({message: "Craft : "+Number(events.slice(-1)[0].returnValues.index) +" Added successfully", id : Number(events.slice(-1)[0].returnValues.index)}) }
              )
          //console.log("response:" + JSON.stringify(response, null, ' '));
        })
      })
      .catch(()=>{
        return res.status(422).json({error: "Unable to add to blockchain"})

    })
    })
})


router.post("/checkcraft",requireLogin,(req,res)=>{
    if(Number(req.body.craft)){
        contract.methods.searchProduct(Number(req.body.craft)).call((err, result) => { return res.json({message: result}) })
    }
    else{
        return res.status(422).json({error: "Please enter numerical value"})
    }
})


router.post("/updatecraft",requireLogin,(req,res)=>{
    if(!req.body.craft){
        return res.status(422).json({error: "Please enter name field"})
    }
    if(!req.body.location){
        return res.status(422).json({error: "Please fill location fields"})
    }

    web3.eth.getTransactionCount(account, (err, txCount) => {
        const txObject = {
        //nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: contract.methods.addState(req.user.email,req.body.craft, (new Date().toString()), req.body.location).encodeABI(),
    }


    web3.eth
    .accounts
    .signTransaction(txObject, private_key)
    .then(function(value){

    web3.eth
    .sendSignedTransaction(value.rawTransaction)
    .then(function(response){
        return res.json({message: "Shipment updated for Craft ID: "+Number(req.body.craft) })
    })
    .catch((err)=>{
        return res.status(422).json({error: "Unable to update shipment to blockchain"})
    })
  })
})

})

module.exports = router