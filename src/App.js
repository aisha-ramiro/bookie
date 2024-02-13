import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';

import Home from './pages/Home';
import Search from './pages/Search';
import Book from './pages/Book/[bookId]';

import './App.css';
import Result from './pages/Result';
import Test from './pages/Test';


function App() {
  return (
    <Router>
     <Navbar />

      <Routes>
      <Route exact path='/' element={<Home />}></Route>
      <Route path='/search' element={<Search />}></Route>
      <Route path='/result'element={<Result />}></Route>
      <Route path='/book/:id' element={<Book />}></Route>
      <Route path='/test' element={<Test />}></Route>

      </Routes>

    <Footer />
    </Router>

  );
}

export default App;
