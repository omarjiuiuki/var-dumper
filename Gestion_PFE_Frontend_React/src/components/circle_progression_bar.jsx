import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ percentage ,color}) => {
  return (
    <div style={{ width: "150px", height: "150px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: color, // Couleur du texte
          pathColor:  color, // Couleur de la barre
          trailColor: "#d6d6d6", // Couleur de l'arrière-plan
        })}
      />
    </div>
  );
};

export default CircularProgress;
