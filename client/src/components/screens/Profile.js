
import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () =>{
    const [mypics, setPics] = useState([])
    const [image, setImage] = useState("")
    //const [url, setUrl] = useState("")
    const {state, dispatch} = useContext(UserContext)
    console.log(state)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])

    useEffect(()=>{
        if(image)
        {
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
                //setUrl(data.url)
                // localStorage.setItem("user",JSON.stringify({...state, pic:data.url}))
                // //console.log(data.url)
                // dispatch({type:"PICUPDATE", payload:data.url})
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state, pic:data.pic}))
                    dispatch({type:"PICUPDATE", payload:result.pic})
                    // window.location.reload()
                })
               
            })
            .catch(err=>{
                console.log(err)
            })
        }

    },[image])

    const updatePicture = (file)=>{
        setImage(file)
  
    }

    return(
     <div style={{maxWidth:"550px", margin:"0px auto"}}>
         <div style={{
             display:"flex",
             justifyContent:"space-around",
             margin:"18px 0px",
             borderBottom:"1px solid grey"
         }}>
             <div>
                <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                src={state?state.pic:"Loading"}
                />
             </div>

             {/* <div>
                <h4> {state?state.name:"Loading"} </h4>
                <div style={{display:"flex",
                justifyContent:"space-between",
                width:"110%"
            }}>
                    <h6> {mypics.length} posts </h6> 
                    <h6> {state?state.followers.length:"0"} Followers </h6> 
                    <h6> {state?state.following.length:"0"} Following </h6> 
                </div>
             </div> */}
              <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h6>{state?state.email:"loading"}</h6>
                   <h6>{state?state.about:"loading"}</h6>
                   <hr></hr>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                        {/* <h6>0 Followers </h6>
                       <h6>0 Following</h6>  */}
                       <h6>{state?state.followers.length:"0"} followers</h6> 
                        <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>
               {/* <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
               onClick={()=> updatePicture()}>
                  Change DP
                </button> */}

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Change DP</span>
                    <input type="file"
                    onChange={(e)=>updatePicture(e.target.files[0])}/>
                </div>
                {/* <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div> */}
            </div>
         </div>
     
         <div className="gallery">
             {
                 mypics.map(item=>{
                     return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                     )
                 })
             }

         </div>
     </div>
    )
}

export default Profile