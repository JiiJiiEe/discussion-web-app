import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import forumApi from '../forumApi';
import Post from './post';
import { getCurrentUser } from '../auth/auth';

const ThreadPage = () => {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const currentUser = getCurrentUser();
  const [threadCreator, setThreadCreator] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    forumApi.get(`/threads/${id}/`)
      .then(response => {
        setThread(response.data);
        setThreadCreator(response.data.user);
        //console.log(currentUser)
        console.log(thread);
        setPosts(response.data.posts);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    forumApi.post(`/threads/${id}/posts/`, { content: newPost, thread: id })
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost('');
      })
      .catch(err => console.error(err));
  };

  const deleteThread = (threadId) => {
    forumApi.delete(`/threads/${threadId}/`)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.error(err));
  };
  
  return (
    <div className="section is-large">
        <div className='box'>
        <h3>{thread.title}</h3>
        <span>Posted by: {threadCreator.username}</span>
        <p>{new Date(thread.created_at).toLocaleString()}</p>
        {(currentUser !== null && (currentUser.user_id === threadCreator.id || currentUser.is_staff)) && (
          <button onClick={() => deleteThread(thread.id)}>Delete thread</button>
        )}
        </div>
        
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="section is-small">
      {(currentUser !== null ) && (
      <form onSubmit={handleSubmitPost}>
        <textarea className='input is-large'
          value={newPost} 
          onChange={(e) => setNewPost(e.target.value)} 
          placeholder="Write a new post..."
          required
        ></textarea>
        <button type="submit">Submit Post</button>
      </form>
      )}
      {(currentUser == null ) && (
        <p>Login or register to send messages.</p>
      )}
    </div>
    </div>
  );
};

export default ThreadPage;