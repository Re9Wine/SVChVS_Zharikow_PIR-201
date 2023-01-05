import React, { useState } from 'react';
import { SneakerCard } from './SneakerCard';
import '../index.css';

const Catalog = ({sneakersData, setSneakersData}) =>{
    const [selectedCard, setSelectedCard] = useState(0);
    
    return(
        <div className="ishop-catalog">
            {sneakersData.map((sneaker) =>
                <SneakerCard 
                key={sneaker.id}
                sneakersData={sneakersData}
                setSneakersData={setSneakersData}
                sneaker={sneaker}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                />
            )}
        </div>
    );
}

export { Catalog };