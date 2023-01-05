import React, { useState } from "react";
import { Catalog } from "../components/Catalog";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import sneakers from "../data/sneakers.json";

const HomePage = () =>{
    const [sneakersData, setSneakersData] = useState(sneakers);

    return(
        <div className="page home">
            <Header />
            <Catalog sneakersData={sneakersData} setSneakersData={setSneakersData} />
            <Footer sneakersData={sneakersData} setSneakersData={setSneakersData} />
        </div>
    );
}

export { HomePage };