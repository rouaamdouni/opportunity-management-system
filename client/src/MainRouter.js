import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {Homepage,SignIn,SingUp} from "./pages/index"
import UserContext from './contexts/UserContext'
export default function MainRouter()
{
    const [user,setUser] = useState([]);
    return (
        <UserContext.Provider value={{user,setUser}}>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={ <SingUp/> } />
            <Route path="/Homepage" element={ <Homepage /> } />
        </Routes>
        </UserContext.Provider>
        )
}