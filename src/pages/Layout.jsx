// Layout.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <div className="relative z-0 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] overflow-x-hidden">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <main className="relative z-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
