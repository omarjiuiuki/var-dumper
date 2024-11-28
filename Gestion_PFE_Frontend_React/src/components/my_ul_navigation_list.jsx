import React from "react";
import { FaSearch } from "react-icons/fa";
import { Fa0 } from "react-icons/fa6";

const UlNavigation = ({ data, activeData, setActiveData ,activeClassName,navClassName,iconStart}) => {
  return (
    <nav className={navClassName}>
      <ul>
        {Object.keys(data).map((type) => (
         <div style={{display : 'flex',justifyContent: 'center',alignItems : 'center'}}>
         
           {
             // ! ici c'est une icon  
             iconStart
           } 
         
          <li
            className={activeData === type ? activeClassName : ""}
            key={type}
            onClick={() => setActiveData(type)}
          >
            {type}
          </li>
         </div>
        ))}
      </ul>
    </nav>
  );
};

export default UlNavigation;