import React, { useState, useEffect } from 'react';
import forumApi from '../forumApi';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../auth/auth';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState('');
  const currentUser = getCurrentUser();

  useEffect(() => {
    forumApi.get('/threads/')
      .then(response => setThreads(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmitThread = (e) => {
    e.preventDefault();
    forumApi.post(`/threads/`, { title: newThread })
      .then((response) => {
        setThreads([...threads, response.data]);
        setNewThread('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="section is-large">
      <h2>Threads</h2>
      <div>
        {threads.map((thread) => (
          <div className='box'>
          <h3 key={thread.id}>
            <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
          </h3>
          </div>
        ))}
      </div>
      <div className="section is-small">
      {(currentUser !== null ) && (
      <form onSubmit={handleSubmitThread}>
        <textarea className='input is-large'
          value={newThread} 
          onChange={(e) => setNewThread(e.target.value)} 
          placeholder="Make a new thread"
          required
        ></textarea>
        <button type="submit">Submit Post</button>
      </form>
      )}
      {(currentUser == null ) && (
        <p>Login or register to create a thread.</p>
      )}
      </div>
    </div>
  );
};

export default ThreadList;