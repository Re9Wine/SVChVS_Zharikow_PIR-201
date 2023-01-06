import React, { useEffect, useState } from 'react';
import { SneakerCard } from './SneakerCard';
import '../index.css';

const Catalog = () => {
    const [sneakersData, setSneakersData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(0);

    useEffect(() => {
        fetch('sneaker')
            .then((response) => response.json())
            .then((data) => setSneakersData(data));
    }, [])

    return(
        <div className="ishop-catalog">
            {sneakersData.map((sneaker) =>
                <SneakerCard 
                key={sneaker.id}
                sneaker={sneaker}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                />
            )}
        </div>
    );
}

export { Catalog };