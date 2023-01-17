import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {Homepage,SignIn,SingUp} from "./pages/index"
import UserContext from './contexts/UserContext'
import AddOpportunity from "./components/components/signIn/AddOpportunity";
export default function MainRouter()
{
    const [user,setUser] = useState([]);
    return (
        <UserContext.Provider value={{user,setUser}}>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={ <SingUp/> } />
            <Route path="/Homepage" element={ <Homepage /> } />
            <Route path="/Homepage/add" element={ <AddOpportunity /> } />
        </Routes>
        </UserContext.Provider>
        )
}