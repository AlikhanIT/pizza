import Header from "../components/Header";
import {SearchContext} from "../App";
import { Outlet } from 'react-router-dom'
import {useState} from "react";

const MainLayout = () => {
    const [searchBy, setSearchBy] = useState('');

    return (
        <SearchContext.Provider value={{searchBy, setSearchBy}}>
            <div className='wrapper'>
                <Header />
                <div className='content'>
                    <Outlet />
                </div>
            </div>
        </SearchContext.Provider>
    )
}

export default MainLayout