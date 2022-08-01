import { Header } from "../components/index";
import { Outlet } from 'react-router-dom'
import React from "react";

const MainLayout: React.FC = () => {
    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <Outlet />
               </div>
        </div>
    )
}

export default MainLayout