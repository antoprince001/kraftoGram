import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
import vid from './video/bc.mp4'
import useSound from 'use-sound';
import music from './sound/sample_audio.mp3'

const SignIn = () =>{
    const [play] = useSound(music);
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html:"Enter a valid email", classes:"#82b1ff blue darken-1"})
            return
        }

        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password,
                email,
                
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
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"SignIn successful", classes: "#00e676 green accent-3"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <body class="bg">
        <video autoPlay loop muted style={{
            position:"absolute",
            width:"100%",
            left:"50%",
            height:"1100px",
            objectFit:"cover",
            transform:"translate(-50%, -50%)",
            zIndex:"-1"
        }}>
            <source src={vid} type="video/mp4"/>
        </video>
        <div className="mycard">
             <div className="card auth-card input-field">
                <h2> Kraftogram </h2>
                <input type="text" 
                placeholder="Email"
                value={email}
                onChange= {(e)=> setEmail(e.target.value)}/>

                <input type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=> PostData()}>
                    Login
                </button>
                
                {/* <button onClick={play}>Boop!</button>; */}

                <h5>
                    <Link to="/signup"> Don't have an account ? </Link>
                </h5>
                <h6>
                    <Link to="/resetPassword"> Forgot password ? </Link>
                </h6>
            </div>
        </div>
        </body>
    )
}

export default SignIn