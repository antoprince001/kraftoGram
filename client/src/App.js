import React, {createContext, useContext, useEffect, useReducer} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import ResetPassword from './components/screens/ResetPassword'
import LatestPassword from './components/screens/LatestPassword'
import FollowedPosts from './components/screens/FollowedUsers'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () =>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user)
    {
      dispatch({type:"USER",payload:user})
      //history.push('/')
    }
    else
    {
      if(!history.location.pathname.startsWith('/resetPassword'))
      {
        history.push('/signin')
      }
    }
  },[])

  return(
    <Switch>
       <Route exact path="/"><Home/></Route>
        <Route path="/signin"> <Signin/> </Route>
        <Route path="/signup"><Signup/></Route>
        <Route exact path="/profile"> <Profile/> </Route>
        <Route path="/create"><CreatePost/></Route>
        <Route path="/followersposts"> <FollowedPosts/> </Route>
        <Route path="/profile/:userid"><UserProfile/></Route>
        <Route exact path="/resetPassword"> <ResetPassword/> </Route>
        <Route path="/resetPassword/:token"> <LatestPassword/> </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
            <NavBar/>
            <Routing/>
        </BrowserRouter>
    </UserContext.Provider>
   
  );
}

export default App;
 