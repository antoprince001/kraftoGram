import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import vid from './video/bc.mp4'

const Signup = () =>{
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [about, setAbout] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("")
    const [lang, setLang] = useState("")
    const [url, setUrl] = useState(undefined)

    const options = [
        'Consumer', 'Craftsman', 'Trader'
      ];
    const defaultOption = options[0];

    const choices = ['English','Hindi','Tamil']
    const defaultChoice = choices[0]
    //mount field
    useEffect(()=>{
        if(url)
        {
            uploadFields()
        }

    },[url])
    
    //profile update
    const uploadPic = () =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","chordsNstrings")
        data.append("cloud_name", "chordsnstrings")
        fetch("https://api.cloudinary.com/v1_1/chordsnstrings/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
            //console.log(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields =() =>{
          
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html:"Enter a valid email", classes:"#82b1ff blue darken-1"})
            return
        }

        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                about,
                pic:url,
                role
            })
        }).then(res=>
            res.json())
        .then(data=>{
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

    const PostData = ()=>{
        if(image)
        {
            uploadPic()
        }
        else
        {
            uploadFields()
        }
      
    }

    return(
       
        <div className="mycard">
             <video autoPlay loop muted style={{
            position:"absolute",
            width:"100%",
            left:"50%",
            height:"1370px",
            objectFit:"cover",
            transform:"translate(-50%, -50%)",
            zIndex:"-1"
        }}>
            <source src={vid} type="video/mp4"/>
        </video>
             <div className="card auth-card input-field">
                <h2> Kraftogram </h2>
                <input type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e)=>setName(e.target.value)}/>

                <input type="text" 
                placeholder="Email"
                value={email}
                onChange= {(e)=> setEmail(e.target.value)}/>

                <input type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>

                <input type="text" 
                placeholder="About you"
                value={about}
                onChange={(e)=> setAbout(e.target.value)}/>

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span> Profile Picture </span>
                    <input type="file"
                    onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            
                <Dropdown 
                options={options} 
                onChange={(e)=> setRole(e.value)}
                value={defaultOption} 
                placeholder="Select Role" />
            <h6> Select Language </h6>
            <Dropdown 
                options={choices} 
                onChange={(e)=> setLang(e.value)}
                value={defaultChoice} 
                placeholder="Select Language" />
            <br/>

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>
                    Sign Up
                </button>
                <h5>
                    <Link to="/signin"> Have an account already ? </Link>
                </h5>
               
            </div>
        </div>
    )
}

export default Signup