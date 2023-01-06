import React, { useState } from "react";
import { AddSneaker } from "../components/forms/AddSneaker";

import "../index.css";

const Footer = () =>{
    const [addFormActive, setAddFormActive] = useState(false);

    const handleAddCard = () =>{
        setAddFormActive(true);
    }

    return(
        <footer className="ishop-footer">
            <AddSneaker 
            active={addFormActive} 
            setActive={setAddFormActive} 
            />
            <button onClick={handleAddCard}>New</button>
        </footer>
    );
}

export { Footer };