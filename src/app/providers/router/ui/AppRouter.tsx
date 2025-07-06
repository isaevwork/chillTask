import {Route, Routes} from "react-router-dom";
import {Home} from "pages/home";
import Mounter from "features/components/Counter/Counter";
import TimeCounter from "features/components/TimeCounter/TimeCounter";
import React from "react";

export const AppRouter = () => {
    return (
        <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path="/mounter" element={<Mounter />} />
            <Route  path="/timecounter" element={<TimeCounter />} />
        </Routes>
    )
}
