import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


const ResetPassword = () =>{
    const history = useHistory()
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html:"Enter a valid email", classes:"#82b1ff blue darken-1"})
            return
        }

        fetch("/resetPassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email
            })
        }).then(res=>
            res.json())
        .then(data=>{
            //console.log(data)
           if(data.error)
           {
               M.toast({html: data.error, classes:"#82b1ff blue darken-1"})
           }
           else{
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
                <input type="text" 
                placeholder="Email"
                value={email}
                onChange= {(e)=> setEmail(e.target.value)}/>

                {/* <input type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/> */}
                <br/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=> PostData()}>
                    Reset password
                </button>
                {/* 
                <h5>
                    <Link to="/signup"> Don't have an account ? </Link>
                </h5> */}
            </div>
        </div>
        </body>
    )
}

export default ResetPassword