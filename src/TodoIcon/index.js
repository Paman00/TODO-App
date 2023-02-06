import React from "react";
import { FaCheck as CheckSVG, FaRegTimesCircle as DeleteSVG } from "react-icons/fa";
import "./TodoIcon.css";

function TodoIcon({ type, color = "gray", onClick }) {
	const iconTypes = {
        "check": (
            <CheckSVG className="Icon-svg Icon-svg--check" fill={color} />
        ),
        "delete": (
            <DeleteSVG className="Icon-svg Icon-svg--delete" fill={color} />
        )
    }
    return ( 
        <span
            className={`Icon-container Icon-container--${type}`} 
            onClick={onClick}
        >
            {iconTypes[type]}
        </span>
    );
}

export { TodoIcon };
