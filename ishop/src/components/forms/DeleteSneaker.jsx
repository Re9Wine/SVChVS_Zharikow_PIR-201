import React, { useEffect } from "react";
import "../../index.css";

const DeleteSneaker = ({sneakersData, setSneakersData , sneakerId, active, setActive}) =>{
    useEffect(() => {
        if(active){
            document.getElementById('root').style.pointerEvents = "none";
        }
        else{
            document.getElementById('root').style.pointerEvents = "all";
        }
    }, [active])

    const handleSubmit = (event) =>{
        const newSneakersData = Object.assign([], sneakersData).filter((sneaker) => sneaker.id !== sneakerId);

        setActive(false);
        setSneakersData(newSneakersData);
        
        event.preventDefault();
    }

    const handleCancelClick = (event) =>{
        document.getElementById('root').style.pointerEvents = "all"
        setActive(false);

        event.preventDefault();
    }

    return(
        <div className={"delete-sneaker-form" + (active ? " delete-sneaker-form-active" : "")} >
            <p>Are you sure about removing?</p>
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Yes" />
                <input type="button" value="Cancel" onClick={handleCancelClick} />
            </form>
        </div>
    );
}

export { DeleteSneaker };