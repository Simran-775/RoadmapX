
import { BrowserRouter } from 'react-router-dom';
import './styles/forms.css';
import './App.css';
import Navbar from './Components/Navbar';
import TakeInput from './Components/TakeInput';
import Footer from './Components/Footer';
import Home from './Components/Home';
import SiteRoutes from './Components/SiteRoutes';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
      
      <SiteRoutes/>

     <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
