import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ThreadList() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewPost] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/threads/')
      .then(response => {
        setThreads(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the threads!", error);
      });
  }, []);

  const handleThreadSubmit = (e) => {
    e.preventDefault();
    if (newThread.trim()) {
      axios.post(`http://localhost:8000/api/threads/`, { title: newThread })
        .then(response => {
          setThreads([...threads, response.data]);  // Append new thread
          //console.log(response.data.id)
          setNewPost('');  // Clear the input
          navigate(`/threads/${response.data.id}`);
        })
        .catch(error => {
          console.error("There was an error creating the thread!", error);
        });
    }
  };

  const handleDeleteThread = (threadId) => {
    if (window.confirm('Are you sure you want to delete this thread?')) {
      axios.delete(`http://localhost:8000/api/threads/${threadId}/`)
        .then(() => {
          setThreads(threads.filter(thread => thread.id !== threadId)); // Remove deleted thread from UI
        })
        .catch(error => {
          console.error("There was an error deleting the thread!", error);
        });
    }
  };

  const renderThreads = () => {
    if (threads.length === 0) {
      return <p>No threads yet. Start a new conversation!</p>;
    }
    return threads.map((thread) => (
      <div key={thread.id} className="thread">
        <Link to={`/threads/${thread.id}`}>
          <h3>{thread.title}</h3>
        </Link>
        <button onClick={() => handleDeleteThread(thread.id)} className="delete-button">Delete Thread</button>
      </div>
    ));
  };

  return (
    <div className="thread-list">
      <h2>keskustelut</h2>
      {renderThreads()}

      <form onSubmit={handleThreadSubmit} className="post-form">
        <textarea
          value={newThread}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a post."
          rows="3"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default ThreadList;