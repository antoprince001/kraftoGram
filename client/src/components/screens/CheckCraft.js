import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const CheckCraft = () =>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [craft, setCraft] = useState("")
    const [query, setQuery] = useState("")
    const PostData = ()=>{
        if(!craft)
        {
            M.toast({html:"Enter a valid craft ID", classes:"#82b1ff blue darken-1"})
            return
        }
        setQuery('Processing')
        fetch("/checkcraft",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                craft : craft
            })
        }).then(res=>
            res.json())
        .then(data=>{
            console.log(data)
           if(data.error)
           {
               M.toast({html: data.error, classes:"#82b1ff blue darken-1"})
               setQuery('Error in Query')
           }
           else{
               
               M.toast({html:"Query Successful !", classes: "#00e676 green accent-3"})
               setQuery(data.message)
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="mycard">
             <div className="card auth-card input-field  #e8eaf6 indigo lighten-5">
                <h4>Check Craft</h4>
                <input type="text" 
                placeholder="Enter Craft ID"
                value={craft}
                onChange= {(e)=> setCraft(e.target.value)}/>

              
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=> PostData()}>
                    Check
                </button>

                
            </div>
            <div className="card auth-card input-field  #e8eaf6 indigo lighten-5">
            {query}
            </div>
        </div>
    )
}

export default CheckCraft