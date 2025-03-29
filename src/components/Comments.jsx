import { useState, useContext } from 'react';
import { BlogContext } from '../context/BlogContext';

function Comments({ blogId, comments }) {
  const [newComment, setNewComment] = useState('');
  const { user, addComment } = useContext(BlogContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    addComment(blogId, {
      text: newComment,
      author: user.username,
      date: new Date().toLocaleDateString()
    });
    setNewComment('');
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p>Please login to comment</p>
      )}
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.author}</strong>
              <span>{comment.date}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;