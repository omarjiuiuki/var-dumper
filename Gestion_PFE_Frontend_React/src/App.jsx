import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FirstPage from './first_page.jsx';

/* 
  *
  *
  *   NB :  c'est la main page ne pas toucher s'il vous plait !!!
  *
  *
  *
*/


const Menu = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'About us', path: '/about-us' },
  { name: 'Shop', path: '/shop' }
];

function App() {
  const [Hi, setHi] = useState('');

  const sayHi = () => {
    if (Hi) {
      setHi('');
    } else {
      setHi('Hello guys!');
    }
  };

  return (
    <Router>
      <div>
        <ul id='menu' style={{ listStyle: 'none' }}>
          {Menu.map(menu => (
            <li key={menu.name}>
              <Link to={menu.path}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <h1>Hello World!</h1>
      <p>hello les amis !!</p>
      <p>{Hi}</p>
      <button onClick={sayHi}>Say HI!</button>

      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/activities" element={<h2>Activities Page</h2>} />
        <Route path="/about-us" element={<h2>About Us Page</h2>} />
        <Route path="/shop" element={<h2>Shop Page</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
