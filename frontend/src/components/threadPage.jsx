import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ThreadPage() {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch thread data (including posts)
    axios.get(`http://localhost:8000/api/threads/${threadId}/`)
      .then(response => {
        setThread(response.data);
        setPosts(response.data.posts);  // Set posts of the thread
      })
      .catch(error => {
        console.error("There was an error fetching the thread!", error);
      });
  }, [threadId]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      axios.post(`http://localhost:8000/api/threads/${threadId}/posts/`, { content: newPost, thread: `${threadId}`})
        .then(response => {
          setPosts([...posts, response.data]);  // Append new post
          setNewPost('');  // Clear the input
        })
        .catch(error => {
          console.error("There was an error creating the post!", error);
        });
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(`http://localhost:8000/api/posts/${postId}/`)
        .then(() => {
          setPosts(posts.filter(post => post.id !== postId)); // Remove deleted post from UI
        })
        .catch(error => {
          console.error("There was an error deleting the post!", error);
        });
    }
  };

  const handleDeleteThread = () => {
    if (window.confirm('Are you sure you want to delete this thread?')) {
      axios.delete(`http://localhost:8000/api/threads/${threadId}/`)
        .then(() => {
          navigate('/'); // Redirect to the threads list after deleting
        })
        .catch(error => {
          console.error("There was an error deleting the thread!", error);
        });
    }
  };

  const renderPosts = () => {
    if (posts.length === 0) {
      return <p>No posts yet. Be the first to reply!</p>;
    }
    return posts.map((post) => (
      <div key={post.id} className="post">
        <p>{post.content}</p>
        <p><small>Posted on: {new Date(post.created_at).toLocaleString()}</small></p>
        <button onClick={() => handleDeletePost(post.id)} className="delete-button">Delete Post</button>
      </div>
    ));
  };

  return (
    <div className="thread-page">
      {thread && <h2>{thread.title}</h2>}

      <section className="posts-section">
        {renderPosts()}
      </section>

      <form onSubmit={handlePostSubmit} className="post-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's your reply?"
          rows="3"
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
}

export default ThreadPage;