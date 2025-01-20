//import logo from './logo.svg';
import './App.css';
//import Navbar from './components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Create />}/>
            <Route path="/all" element={<Read />}/>
            <Route path="/:id" element={<Update />}/>
          </Routes>
      </BrowserRouter>
  </div>
   
    
  );
}

export default App;
