
import { useState,useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';




import { ClipLoader } from 'react-spinners';
import { FaBell, FaSearch } from 'react-icons/fa';




function HomePage(){
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
    </>
  );
}
export default HomePage;