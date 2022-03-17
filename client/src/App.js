import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Blogs from './pages/Blogs.js'
import BlogDetail from './pages/BlogDetail';
import { Layout } from 'antd';

const { Header, Content } = Layout;
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/add" element={<BlogDetail />} />
        <Route path="/blogs/edit/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
