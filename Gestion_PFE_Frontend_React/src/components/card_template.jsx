import React from "react";
 
  const MyCardTemplate = ({ titre, description ,onClick,isSelected}) =>{
     
    return (
        <div id="my-card-container"   className={isSelected ? "active-template" : ""} onClick={onClick}>
          <div className="card-content">
            <div className="titre-container">
              <h1>{titre}</h1>
            </div>
            <div className="description-container">
              <p>{description}</p>
            </div>
          </div>
        </div>
      ); 

  }

  export default MyCardTemplate;