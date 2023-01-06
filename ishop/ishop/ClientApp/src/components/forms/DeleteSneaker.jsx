import React, { useEffect } from "react";
import "../../index.css";

const DeleteSneaker = ({sneakerId, active, setActive}) =>{
    useEffect(() => {
        if(active){
            document.getElementById('root').style.pointerEvents = "none";
        }
        else{
            document.getElementById('root').style.pointerEvents = "all";
        }
    }, [active])

    const handleSubmit = () => {
        const data = sneakerId;

        fetch('sneaker', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        window.location.reload();
    }

    const handleCancelClick = () =>{
        document.getElementById('root').style.pointerEvents = "all"
        setActive(false);
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
