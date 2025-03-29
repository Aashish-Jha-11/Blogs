import { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      const blogPosts = data.map(country => ({
        id: country.cca3,
        title: country.name.common,
        content: `Learn about ${country.name.common}, a fascinating country with a population of ${country.population?.toLocaleString() || 'N/A'} people.`,
        image: country.flags.png,
        population: country.population || 0,
        region: country.region || 'Unknown',
        likes: 0,
        comments: []
      }));
      setCountries(blogPosts);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const login = (username, password) => {
    // Basic authentication (demo purposes only)
    if (username === 'user' && password === 'password') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addComment = (blogId, comment) => {
    setCountries(prevCountries => 
      prevCountries.map(country => 
        country.id === blogId
          ? {
              ...country,
              comments: [...country.comments, { ...comment, id: Date.now() }]
            }
          : country
      )
    );
  };

  const toggleLike = (blogId) => {
    setCountries(prevCountries =>
      prevCountries.map(country =>
        country.id === blogId
          ? { ...country, likes: country.likes + 1 }
          : country
      )
    );
  };

  const filteredCountries = countries.filter(country =>
    country.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BlogContext.Provider 
      value={{ 
        countries: filteredCountries, 
        loading, 
        error, 
        user,
        searchTerm,
        setSearchTerm,
        login,
        logout,
        addComment,
        toggleLike
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};