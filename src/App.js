import React from "react";
import P1 from "./Projects/P1/P1";
import P2 from "./Projects/P2/P2";
import P3 from "./Projects/P3/P3";
import P4 from "./Projects/P4/P4";
import P5 from "./Projects/P5/P5";
import P6 from "./Projects/P6/P6";
import P7 from "./Projects/P7/P7";
import P8 from "./Projects/P8/P8";
import P9 from "./Projects/P9/P9";
import P10 from "./Projects/P10/P10";
import P11 from "./Projects/P11/P11";
import P12 from "./Projects/P12/P12";
import P13 from "./Projects/P13/P13";
import P14 from "./Projects/P14/P14";
import P15 from "./Projects/P15/P15";
import P16 from "./Projects/P16/P16";
import P17 from "./Projects/P17/P17";
import { Route, Routes } from "react-router-dom";
import P18 from "./Projects/P18/P18";
import CookingSite from "./Projects/P18/CookingSite";
import AppNavbar from "./Navbar/AppNavbar";
import P19 from "./Projects/P19/P19";
import P20 from "./Projects/P20/P20";

const App = () => {
    return (
        <>
            <AppNavbar />
            <Routes>
                <Route
                    path="/React-25-Project-Course"
                    element={
                        <>
                            <P1 />
                            <P2 />
                            <P3 />
                            <P4 />
                            <P5 />
                            <P6 />
                            <P7 />
                            <P8 />
                            <P9 />
                            <P10 />
                            <P11 />
                            <P12 />
                            <P13 />
                            <P14 />
                            <P15 />
                            <P16 />
                            <P17 />
                            <P18 />
                            <P19 />
                            <P20 />
                        </>
                    }
                />
                <Route
                    path="/React-25-Project-Course/cooking-site/*"
                    element={<CookingSite />}
                />
                <Route
                    path="*"
                    element={
                        <div>
                            <h1>Page Not Found!</h1>
                        </div>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
