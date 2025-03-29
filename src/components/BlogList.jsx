import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGlobe, FaUsers } from 'react-icons/fa';

function BlogList() {
  const { countries, loading, error } = useContext(BlogContext);

  if (loading) return (
    <div className="loading-spinner">
      <FaGlobe size={40} />
    </div>
  );
  
  if (error) return <div>Error: {error}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="blog-list"
    >
      <h1>Explore Countries Around the World</h1>
      <div className="blog-grid">
        {countries.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="blog-card"
          >
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <div className="stats">
                <span className="stat-item">
                  <FaUsers />
                  {blog.population?.toLocaleString() || 'N/A'}
                </span>
                <span className="stat-item">
                  <FaGlobe />
                  {blog.region || 'Unknown'}
                </span>
              </div>
              <p>{blog.content.substring(0, 100)}...</p>
              <Link to={`/blog/${blog.id}`} className="read-more">
                Explore More <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default BlogList;