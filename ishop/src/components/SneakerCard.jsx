import React from 'react';
import { useState } from 'react';
import '../index.css';
import { DeleteSneaker } from './forms/DeleteSneaker';
import { EditSneaker } from './forms/EditSneaker';

const SneakerCard = ({sneakersData, setSneakersData, sneaker, selectedCard, setSelectedCard}) =>{
    const [deleteFormnActive, setDeleteFormActive] = useState(false);
    const [editFormActive, setEditFormActive] = useState(false)

    const handleSneakerCardClick = () =>{
        setSelectedCard(sneaker.id);
    }

    const handleDeleteCard = () =>{
        setDeleteFormActive(true);
    }

    const handleEditCard = () =>{
        setEditFormActive(true);
    }

    return(
        <>
            <div className={"sneaker-card" 
            + (selectedCard === sneaker.id ? " sneaker-card-active" : "")
            + (editFormActive ? " sneaker-card-undisplay" : "")} 
            onClick={handleSneakerCardClick}>
                <div className="sneaker-card-photo">
                    <img src={sneaker.photo} alt={sneaker.name} />
                </div>
                <h2>{sneaker.name}</h2>
                <p>{sneaker.cost} BYN</p>
                <p>Left in stock: {sneaker.count}</p>
                <div className="sneaker-card-buttons" style={{display: (deleteFormnActive ? "none" : "flex")}}>
                    <button onClick={handleEditCard}>Edit</button>
                    <button onClick={handleDeleteCard}>Delete</button>
                </div>
                { deleteFormnActive
                ? <DeleteSneaker 
                sneakersData={sneakersData}
                setSneakersData={setSneakersData}
                sneakerId={sneaker.id}
                active={deleteFormnActive} 
                setActive={setDeleteFormActive}
                />
                : <></>
                }
            </div>
            { editFormActive
            ? <EditSneaker
            selectedCard={selectedCard}
            sneakersData={sneakersData}
            setSneakersData={setSneakersData}
            sneakerId={sneaker.id}
            active={editFormActive}
            setActive={setEditFormActive}
            />
            : <></>
            }
        </>
    );
}

export { SneakerCard };