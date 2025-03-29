import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(BlogContext);

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;