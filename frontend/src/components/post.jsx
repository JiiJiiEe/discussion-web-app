import React from 'react';
import { getCurrentUser } from '../auth/auth';
import forumApi from '../forumApi';

const Post = ({ post }) => {
  const currentUser = getCurrentUser();

  const deletePost = (postId) => {
    forumApi.delete(`/posts/${postId}/`)
      .then(() => {
        window.location.reload();  // Reload page after deletion
      })
      .catch(err => console.error(err));
  };

  //console.log(currentUser)
  //console.log(post.user.id)
  return (
    <div className='box'>
      <p>{post.content}</p>
      <span>Posted by: {post.user.username}</span>
      <p>Posted: {new Date(post.created_at).toLocaleString()}</p>
      {(currentUser !== null && (currentUser.user_id === post.user.id || currentUser.is_staff)) && (
        <button onClick={() => deletePost(post.id)}>Delete Post</button>
      )}
    </div>
  );
};

export default Post;