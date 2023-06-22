import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <>
    <Navbar/>
    <Router>
        <NavBar />
        <div className="container my-3">
          <Routes>
            <Route exact path="/" element={<Home/>}>
            </Route>
            <Route exact path="/about" element={<Home/>}>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
