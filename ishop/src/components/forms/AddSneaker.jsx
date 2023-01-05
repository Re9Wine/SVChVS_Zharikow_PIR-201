import React, { useEffect, useState } from "react";
import "../../index.css";

const AddSneaker = ({active, setActive, sneakersData, setSneakersData}) =>{
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [count, setCount] = useState(0);
    const [formValid, setFormValid] = useState(false);

    const [photoDirty, setPhotoDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [costDirty, setCostDirty] = useState(false);
    const [countDirty, setCountDirty] = useState(false);

    const [photoError, setPhotoError] = useState("No photo selected");
    const [nameError, setNameError] = useState("Name is empty");
    const [costError, setCostError] = useState("Cost is empty");
    const [countError, setCountError] = useState("Count is empty");

    useEffect(() => {
        if(photoError || nameError || costError || countError){
            setFormValid(false);
        }
        else{
            setFormValid(true);
        }

        if(active){
            document.getElementById('root').style.pointerEvents = "none";
        }
        else{
            document.getElementById('root').style.pointerEvents = "all";
        }
    }, [photoError, nameError, costError, countError, active])

    const handleSubmit = (event) => {
        const newSneakerData = Object.assign([], sneakersData);
        const newSneaker = {
            "id": sneakersData.length + 1,
            "name": name,
            "cost": cost,
            "photo": photo,
            "count": count
        }
        
        newSneakerData.push(newSneaker);
        
        setSneakersData(newSneakerData);

        setActive(false);
        setPhoto("");
        setName("");
        setCost(0);
        setCount(0);
        
        setPhotoDirty(false);
        setNameDirty(false);
        setCostDirty(false);
        setCountDirty(false);
        
        setPhotoError("Photo is empty");
        setNameError("Name is empty");
        setCostError("Cost is empty");
        setCountError("Count is empty");

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
        console.log(event.target);

        setPhoto(event.target.value);

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
        }
        else if(!event.target.value){
            setNameError("Name is empty");
        }
        else{
            setNameError("");
        }
    }

    const handleCostChange = (event) =>{
        setCost(event.target.value);

        if(event.target.value){
            setCostError("");
        }
        else{
            setCostError("Cost is empty");
        }
    }

    const handleCountChange = (event) =>{
        setCount(event.target.value);

        if(event.target.value){
            setCountError("");
        }
        else{
            setCountError("Count is empty");
        }
    }
    
    const handleCancelClick = () =>{
        setActive(false);
    }

    return(
        <form className={"add-sneaker-form" + (active ? " add-sneaker-form-active" : "" )} onSubmit={handleSubmit}>
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
            <input className="input-submit" disabled={!formValid} type="submit" value="Add" 
            style={(!formValid) ? {cursor: "not-allowed"} : {}} />
            <input className="input-cancel" type="button" value="Cancel" onClick={handleCancelClick} />
        </form>
    );
}

export { AddSneaker };