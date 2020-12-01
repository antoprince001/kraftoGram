import React, {useState, useContext} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import M from 'materialize-css'

const LatestPassword = () =>{
    const history = useHistory()
    const [password, setPassword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        // {
        //     M.toast({html:"Enter a valid email", classes:"#82b1ff blue darken-1"})
        //     return
        // }

        fetch("/newPassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password,
                token,
            })
        }).then(res=>
            res.json())
        .then(data=>{
            console.log(data)
           if(data.error)
           {
               M.toast({html: data.error, classes:"#82b1ff blue darken-1"})
           }
           else{
            //    localStorage.setItem("jwt",data.token)
            //    localStorage.setItem("user",JSON.stringify(data.user))
            //    dispatch({type:"USER",payload:data.user})
               M.toast({html:data.message, classes: "#00e676 green accent-3"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <body class="bg">
        <div className="mycard">
             <div className="card auth-card input-field">
                <h2> Chords 'N' Strings </h2>
            
                <input type="password" 
                placeholder="Enter new password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=> PostData()}>
                    Change password
                </button>
            </div>
        </div>
        </body>
    )
}

export default LatestPassword