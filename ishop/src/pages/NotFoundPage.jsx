import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () =>{
    return(
        <div className="page not-found">
            <h2>Error!!!!</h2>
            <h2> Page is not found</h2>
            <h2>If you want return to home pahe click <Link to="/">here</Link></h2>
        </div>
    );
}

export { NotFoundPage };