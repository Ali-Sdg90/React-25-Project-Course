import React from "react";
import { Link } from "react-router-dom";

const P18 = () => {
    return (
        <div>
            <Link to={"/React-25-Project-Course/cooking-site/home"}>
                <button>Go to Cooking Site</button>
            </Link>
            <pre style={{ marginBottom: "3px" }}>#react-router-dom</pre>
        </div>
    );
};

export default P18;
