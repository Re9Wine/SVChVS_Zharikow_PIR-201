import React, { useState } from "react";
import { Catalog } from "./components/Catalog";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import sneakers from "./data/sneakers.json";

const App = () =>{
    const [sneakersData, setSneakersData] = useState(sneakers);

    return (
        <main className="wrapper">
          <Header />
          <Catalog sneakersData={sneakersData} setSneakersData={setSneakersData} />
          <Footer sneakersData={sneakersData} setSneakersData={setSneakersData} />
        </main>
      );
}

export default App;