import { RoomContext } from '../../../context';
import React, { useState, useCallback, useContext } from 'react';
import { FiLogIn } from 'react-icons/fi';
import logo from '../../../static/logo.png';

import './styles.css';

export function Home() {
  const { isConnected, handleConnect } = useContext(RoomContext);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleOnChange = useCallback((e) => {
    switch (e.target.id) {
      case 'chat-username-input':
        setUsername(e.target.value);
        break;

      case 'chat-room-input':
        setRoom(e.target.value);
        break;

      default:
        break;
    }
  }, []);

  return (
    <div className="main">
      <div>
        {/* <h1 className="login-title">Markdown Chat</h1> */}
        <img src={logo} alt="" />
        <input
          onChange={handleOnChange}
          value={username}
          type="text"
          id="chat-username-input"
          size="39"
          autoFocus
          placeholder="username"
          disabled={isConnected}
          className="fields"
        />
        <input
          onChange={handleOnChange}
          value={room}
          type="text"
          id="chat-room-input"
          size="39"
          placeholder="room"
          disabled={isConnected}
          className="fields"
        />
        <button
          type="button"
          value=""
          id="chat-connect"
          onClick={() => { handleConnect(username, room) }}
          disabled={username.length === 0 || room.length === 0}
          className="enter-room-button"
        >
          <span>Enter Room</span>
          <FiLogIn className="logout-icon" size={20} />
        </button>
      </div>

    </div>
  );
}
