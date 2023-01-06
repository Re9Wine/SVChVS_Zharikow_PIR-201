import React, { useState } from "react";
import { Catalog } from "../components/Catalog";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const HomePage = () =>{
    return(
        <div className="page home">
            <Header />
            <Catalog />
            <Footer />
        </div>
    );
}

export { HomePage };