
import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () =>{
    const [userProfile, setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          //console.log(result)
         
          setProfile(result)
        })
    },[])

    const followUser =()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            //console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState=>{
                return {
                    //past state- i/p
                    ...prevState,
                    //new data
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            }))
        })
        setShowFollow(false)
    }

    const unfollowUser =()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            //console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState=>{
                const newFollowers = prevState.user.followers.filter(item=>item !== data._id)
                return {
                    //past state- i/p
                    ...prevState,
                    //new data
                    user:{
                        ...prevState.user,
                        followers:newFollowers
                    }
                }
            }))
        })
        setShowFollow(true)
    }

    return(
    <>
    {userProfile ? 
     <div style={{maxWidth:"550px", margin:"0px auto"}}>
         <div style={{
             display:"flex",
             justifyContent:"space-around",
             margin:"18px 0px",
             borderBottom:"1px solid grey"
         }}>
             <div>
                <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                src={userProfile.user.pic}
                />
             </div>

             <div>
                <h4> {userProfile.user.name} </h4>
                <h6> {userProfile.user.email} </h6>
                <h6> {userProfile.user.about} </h6>
                <div style={{display:"flex",
                justifyContent:"space-between",
                width:"110%"
            }}>
                    <h6> {userProfile.posts.length} Posts </h6> 
                    <h6> {userProfile.user.followers.length} Followers </h6> 
                    <h6> {userProfile.user.following.length} Following </h6> 
                    <br></br>
                   
                </div>
             </div>
             {showfollow ?
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>followUser()}>
                    Follow
                </button>
                : <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>unfollowUser()}>
                    Unfollow
                </button>}
            
         </div>
       
         <div className="gallery">
             {
                 userProfile.posts.map(item=>{
                     return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                     )
                 })
             }

         </div>
     </div>
      : <h2> Loading </h2> }
     </>
    )
}

export default Profile