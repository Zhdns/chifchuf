import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import './index.css'
import { useSelector } from 'react-redux';
import ListPrint from './Pages/List';

function Logo() { 
  return (
      <div className="header">
          <h1 className="logo mainFont">#CHIFCHUF</h1>
      </div>
  )
  
}

function App() {
  const nowSubmit = useSelector((state) => state.or.submit)

  return (
    <div>
      <Logo/>
      { !nowSubmit ? <Home/> : <ListPrint/>}
    </div>
  );
}

export default App;
