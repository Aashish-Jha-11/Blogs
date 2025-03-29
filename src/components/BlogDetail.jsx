import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import Comments from './Comments';

function BlogDetail() {
  const { id } = useParams();
  const { countries, loading, error, user, toggleLike } = useContext(BlogContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const blog = countries.find(country => country.id === id);
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="detail-image" />
      <p>{blog.content}</p>
      <div className="interactions">
        <button 
          className="like-button"
          onClick={() => user && toggleLike(blog.id)}
          disabled={!user}
        >
          ❤️ {blog.likes} Likes
        </button>
      </div>
      <Comments blogId={blog.id} comments={blog.comments} />
    </div>
  );
}

export default BlogDetail;