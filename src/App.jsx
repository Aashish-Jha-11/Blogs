import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Login from './components/Login';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <BlogProvider>
      <HashRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </HashRouter>
    </BlogProvider>
  );
}

export default App;