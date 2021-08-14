import React, { useCallback, useState, useRef, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown'
import { FiLogOut, FiSend, FiMenu } from 'react-icons/fi';

import { RoomContext } from '../../../context';

import './styles.css';
import { useMemo } from 'react';

export function Room() {
  const [message, setMessage] = useState('');
  const [showUsers, setShowMenu] = useState(true);
  const {
    isConnected,
    handleSendMessage,
    messageHistory,
    handleConnect,
    signedRoom,
    usersList,
    signedUser,
  } = useContext(RoomContext);
  const messageInputRef = useRef(null);

  useEffect(() => {
    const messageContainer = document.getElementById('messages-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [messageHistory]);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setShowMenu(innerWidth > 600);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOnChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleMessageInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSendMessage(message);
      setMessage('');
      messageInputRef.current.focus();
    }
  }, [handleSendMessage, message])

  return (
    <div className="chat-room-container">
      <div className="chat-room-header-container">
        <div className="signed-room-div">
          <h3>Room: {signedRoom}</h3>
        </div>
        <div className="leave-room-div">
          <div className="leave-room-button-container">
            <button
              type="button"
              id="chat-connect"
              onClick={handleConnect}
              className="leave-room-button"
            >
              <FiLogOut className="logout-icon" size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="message-container">
        <div className={showUsers ? 'users-list-container' : 'hide-menu'}>
          <ul className="layout-list">
            {usersList.map((item, index) => (
              <li className="username-list-item" key={index.toString()}>{item.username}</li>
            ))}
          </ul>
        </div>
        <div className={showUsers ? "message-list-container" : "message-list-container expand-message-list-container"}>
          <div className="message-list-container-header" >
            <button onClick={() => { setShowMenu(state => !state) }} >
              <FiMenu className="menu-icon" size={20} />
            </button>
          </div>
          <ul className="layout-list" id="messages-container">
            {messageHistory.map((item, index) => {
              const messageItemClass = item.username === signedUser ? "message-item right" : "message-item";
              const messageBoxClass = item.username === signedUser ? "message-box me" : "message-box";
              const time = format(new Date(), 'MM/dd/yyyy HH:mm');

              return (
                <li className={messageItemClass} key={index.toString()}>
                  <strong>{item.username}</strong>
                  <div className={messageBoxClass}>
                    <p>
                      <ReactMarkdown>
                        {item.message}
                      </ReactMarkdown>
                    </p>
                    <p className="message-time">{time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="chat-room-bottom-container" onChange={(e) => { e.preventDefault() }} >
        <div className="chat-room-message-container">
          <textarea
            ref={messageInputRef}
            onChange={handleOnChange}
            value={message}
            id="chat-message-input"
            placeholder="Type a message"
            onKeyDown={handleMessageInputKeyDown}
            className="chat-room-message-input"
          />
        </div>
        <div className="chat-room-send-button-container">
          <div className="send-message-button-container" >
            <button
              type="button"
              value=""
              id="chat-message-submit"
              title="Press Ctrl+Enter to send"
              onClick={() => {
                handleSendMessage(message);
                setMessage('');
                messageInputRef.current.focus();
              }}
              disabled={!isConnected}
              className="send-message-button"
            >
              <FiSend className="send-icon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
