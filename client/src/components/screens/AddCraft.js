import React, {useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useQRCode } from 'react-hook-qrcode';

const AddCraft = () =>{
    const history = useHistory()
    const [name, setName] = useState("")
    const [added, setAdded] = useState("")
    const [id, setId] = useState("0")

    const [inputRef] = useQRCode({
        text: !id ? "0" : id ,
        options: {  
          level: 'M',
          margin: 7,
          scale: 1,
          width: 200,
          color: {
            dark: '#010599FF',
            light: '#FFBF60FF',
          },
        },
      });
      

    const PostData = ()=>{
        if(!name)
        {
            M.toast({html:"Enter a valid name", classes:"#82b1ff blue darken-1"})
            return
        }
     
        setAdded("Processing")

        fetch("/addcraft",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                name
            })
        }).then(res=>
            res.json())
        .then(data=>{
           if(data.error)
           {
               M.toast({html: data.error, classes:"#82b1ff blue darken-1"})
               setAdded("Error in process")
           }
           else{
               M.toast({html: 'Added Successfully !', classes: "#00e676 green accent-3"})
               setAdded(data.message)
               console.log(data)
               setId(data.id.toString())
               setName("")
               //history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

   
    return(
        <div className="mycard">
             <div className="card auth-card input-field #e8eaf6 indigo lighten-5">
                <h4>Please Fill Craft Details</h4>
                <input type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e)=>setName(e.target.value)}/>

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>
                    Register Craft
                </button>
                
            </div>

            <div className="card auth-card input-field #e8eaf6 indigo lighten-5">
                {added}
                <br />
                <canvas ref={inputRef} /> 
            </div>
            
        </div>
    )
}

export default AddCraft