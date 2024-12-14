
import { useState,useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import '../styles/home_page.css';

import { ClipLoader } from 'react-spinners';
import { FaBell, FaSearch } from 'react-icons/fa';
import MyCalendar from '../../../components/my_calendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function HomePage(){



  const [events, setEvents] = useState([
    {
      title: 'Réunion',
      start: new Date(2024, 11, 10, 10, 0),
      end: new Date(2024, 11, 10, 11, 0),
    },
    {
      title: 'Déjeuner',
      start: new Date(2024, 11, 11, 12, 0),
      end: new Date(2024, 11, 11, 13, 0),
    },
  ]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((evt) =>
      evt === event ? { ...evt, start, end } : evt
    );
    setEvents(updatedEvents);
  };







  return (
    <>  
    <div className="appBar">
    <form className="search-form" action="">
      <input
        type="text"
        className="search"
        placeholder="Recherche..."
      />
      <button type="submit" className="search-button">
        <FaSearch />
      </button>
    </form>

    <div className="account-notif-block">
      <button
        onClick={() => {
          alert("Bonjour admin");
        }}
      >
        Admin
      </button>
      <button
        onClick={() => {
          alert("Bonjour admin");
        }}
      >
        <FaBell size={17} />
      </button>
    </div>
  </div>
      <div className="loading-indicator">
        <ClipLoader color="#00BFFF" loading={true} size={40} />
        <p>Chargement...</p>
      </div>

      <DndProvider backend={HTML5Backend}>
      <MyCalendar events={events} onEventDrop={handleEventDrop} />
    </DndProvider>

    </>
  );
}
export default HomePage;