import './App.css'
import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {
	Routes,
	Route,
} from "react-router-dom";
import Cart from "./pages/Cart";
import {createContext, useState} from "react";

export const SearchContext = createContext();

function App() {
	const [searchBy, setSearchBy] = useState('');

	return (
		<SearchContext.Provider value={{searchBy, setSearchBy}}>
			<div className='wrapper'>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home searchBy={searchBy} />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</SearchContext.Provider>
	)
}

export default App
