import React, { useState, useEffect } from "react";
import "../../index.css";

const EditSneaker = ({selectedCard, sneakersData, setSneakersData , sneakerId, active, setActive}) =>{
    const oldSneaker = Object.assign([], sneakersData).find((sneaker) => sneaker.id === sneakerId)

    const [photo, setPhoto] = useState(oldSneaker.photo);
    const [name, setName] = useState(oldSneaker.name);
    const [cost, setCost] = useState(oldSneaker.cost);
    const [count, setCount] = useState(oldSneaker.count);
    const [formValid, setFormValid] = useState(true);

    const [photoDirty, setPhotoDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [costDirty, setCostDirty] = useState(false);
    const [countDirty, setCountDirty] = useState(false);
    
    const [photoError, setPhotoError] = useState("");
    const [nameError, setNameError] = useState("");
    const [costError, setCostError] = useState("");
    const [countError, setCountError] = useState("");

    useEffect(() => {
        if(photoDirty || nameDirty || costDirty || countDirty){
            document.getElementById('root').style.pointerEvents = "none";
        }
        else{
            document.getElementById('root').style.pointerEvents = "all";
        }

        if(selectedCard != sneakerId){
            setActive(false);
        }
    }, [selectedCard, photoDirty, nameDirty, costDirty, countDirty]);

    const handleCancelClick = () =>{
        setActive(false);
        document.getElementById('root').style.pointerEvents = "all";
    }

    const handleSubmit = (event) => {
        const editSneakersData = Object.assign([], sneakersData);
        const editSneaker = {
            "id": oldSneaker.id,
            "name": name,
            "cost": cost,
            "photo": photo,
            "count": count
        }

        editSneakersData.splice(editSneakersData.indexOf(oldSneaker), 1, editSneaker);
        
        setSneakersData(editSneakersData);

        document.getElementById('root').style.pointerEvents = "all";

        setActive(false);

        event.preventDefault();
    }

    const handleBlur = (event) => {
        switch (event.target.name){
            case "photo":
                setPhotoDirty(true);
                break;
            case "name":
                setNameDirty(true);
                break;
            case "cost":
                setCostDirty(true);
                break;
            case "count":
                setCountDirty(true);
                break;
            default:
                break;
        }
    }

    const handlePhotoChange = (event) =>{
        setPhoto("" + event.target.value);

        if(event.target.value){
            setPhotoError("");
        }
        else{
            setPhotoError("No photo selected");
        }
    }    

    const handleNameChange = (event) =>{
        setName(event.target.value);

        if(sneakersData.find((sneaker) => sneaker.name === event.target.value) !== undefined){
            setNameError("Name already exists");
            setFormValid(false);
        }
        else if(!event.target.value){
            setNameError("Name is empty");
            setFormValid(false);
        }
        else{
            setNameError("");
            setFormValid(true);
        }
    }

    const handleCostChange = (event) =>{
        setCost(event.target.value);

        if(event.target.value){
            setCostError("");
            setFormValid(true);
        }
        else{
            setCostError("Cost is empty");
            setFormValid(false);
        }
    }

    const handleCountChange = (event) =>{
        setCount(event.target.value);

        if(event.target.value){
            setCountError("");
            setFormValid(true);
        }
        else{
            setCountError("Count is empty");
            setFormValid(false);
        }
    }

    return(
        <form className={"edit-sneaker-form" + (active ? " edit-sneaker-form-active" : "" )} onSubmit={handleSubmit}>
            <div>
                <input className="input-photo" type="text" name="photo" value={photo} placeholder="Enter photo path"
                    onChange={handlePhotoChange} onBlur={handleBlur} />
                {(photoDirty && photoError) && <p>{photoError}</p>}
            </div>
            <div>
                <input className="input-name" name="name" type="text" value={name} placeholder="Enter Name" 
                onBlur={handleBlur} 
                onChange={handleNameChange}/>
                {(nameDirty && nameError) && <p>{nameError}</p>}
            </div>
            <div>
                <input className="input-cost" name="cost" type="number" min="0" value={cost} placeholder="Enter Cost" 
                onBlur={handleBlur} 
                onChange={handleCostChange}/>
                {(costDirty && costError) && <p>{costError}</p>}
            </div>
            <div>
                <input className="input-count" name="count" type="number" min="0" value={count} placeholder="Enter Count" 
                onBlur={handleBlur} onChange={handleCountChange}/>
                {(countDirty && countError) && <p>{countError}</p>}
            </div>
            <input className="input-submit" disabled={!formValid} type="submit" value="Save" 
            style={(!formValid) ? {cursor: "not-allowed"} : {}} />
            <input className="input-cancel" type="button" value="Cancel" onClick={handleCancelClick} />
        </form>
    );
}

export { EditSneaker };