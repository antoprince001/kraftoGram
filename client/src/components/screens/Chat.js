import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { useLocation } from 'react-router-dom';
import TextContainer from './chatcomponents/TextContainer/TextContainer';
import Messages from './chatcomponents/Messages/Messages';
import InfoBar from './chatcomponents/InfoBar/InfoBar';
import Input from './chatcomponents/Input/Input';

import './Chat.css';


let socket;
const ENDPOINT = '/';

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  console.log(location)

   useEffect(() => {
     const { name, community } = queryString.parse(location.search);
    socket = io('/');
    console.log(name,community)
    setRoom(community);
    setName(name);

    socket.emit('join', { name, room : community }, (error) => {
      if(error) {
        alert(error);
      }
    });
   }, [ ENDPOINT,location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;