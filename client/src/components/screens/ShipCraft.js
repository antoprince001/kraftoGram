import React, {useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const ShipCraft = () =>{
    const history = useHistory()
    const [craft, setCraft] = useState("")
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [loc, setLoc] = useState('Current Location')
    const [region, setRegion] = useState("")
    const [states, setStates] = useState("")
    const [shipped, setShipped] = useState("")


    const options = [
        'Current Location', 'Manual Location'
      ];
    const defaultOption = options[0];

    const PostData = ()=>{
        var locat = "";
        if(loc === 'Current Location')
        { 
             locat = lat + "," + long;
        }
        else{
             locat = region + "," + states;
        }
        if(!craft)
        {
            M.toast({html:"Enter a valid craft ID", classes:"#82b1ff blue darken-1"})
            return
        }
     
        setShipped("Processing")

        fetch("/updatecraft",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                craft : craft,
                location : locat
            })
        }).then(res=>
            res.json())
        .then(data=>{
           if(data.error)
           {
               M.toast({html: data.error, classes:"#82b1ff blue darken-1"})
               setShipped("Error in process")
           }
           else{
               M.toast({html: 'Shipment Successful !', classes: "#00e676 green accent-3"})
               setShipped(data.message)
               setCraft("")
               //history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        })
       },[]);
    return(
        <div className="mycard">
             <div className="card auth-card input-field #e8eaf6 indigo lighten-5">
                <h4>Update Shipment</h4>
                <input type="text" 
                placeholder="Enter Craft ID"
                value={craft}
                onChange= {(e)=> setCraft(e.target.value)}/>

            

                <Dropdown 
                options={options} 
                onChange={(e)=> setLoc(e.value)}
                value={defaultOption} 
                placeholder="Select Location" />
                <br/>

                {loc === 'Current Location'  &&
                <input type="text" 
                placeholder="Lat" 
                value={lat} 
               />
                }

                {loc === 'Current Location'  &&
                <input type="text" 
                placeholder="Long" 
                value={long} 
                />
                }

                { loc !== 'Current Location' &&  
                <input type="text" 
                placeholder="State" 
                value={states} 
                onChange={(e)=>setStates(e.target.value)}/>
                }

                { loc !== 'Current Location' &&
                <input type="text" 
                placeholder="Region" 
                value={region} 
                onChange={(e)=>setRegion(e.target.value)}/>
                }
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>
                    Update Craft
                </button>
                
            </div>
            <div className="card auth-card input-field #e8eaf6 indigo lighten-5">
                {shipped}
            </div>
        </div>
    )
}

export default ShipCraft