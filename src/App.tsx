import './App.css'
import './scss/app.scss'
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {
	Routes,
	Route,
} from "react-router-dom";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import React from "react";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path=':sortProperty/:activeCateg/:curPage' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
