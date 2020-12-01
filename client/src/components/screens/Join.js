import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

import './Join.css';

const Join = () =>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [name, setName] = useState("")
    const [community, setCommunity] = useState("")


    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join Community</h1>
                {/* <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) =>{ setName(event.target.value)}} /></div>   */}
                <div><input placeholder="Community" className="joinInput mt-20" type="text" onChange={(event) =>{ setCommunity(event.target.value)}} /></div>       
                <Link onClick={ event => (!community ) ? event.preventDefault : null } to={`/chat?name=${state.name}&community=${community}`}>
                    <button className="button mt-20" type="submit">Enter</button>
                </Link>
            </div>             
        </div>
    )
}

export default Join