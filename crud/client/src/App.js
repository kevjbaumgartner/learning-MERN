// Library imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Component imports
import Navbar from './components/navbar';
import Create from './components/create';
import Edit from './components/edit';
import RecordList from './components/recordList';

// App
const App = () => {
	const Page = (
		<div>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<RecordList />} />
				<Route path='/edit/:id' element={<Edit />} />
				<Route path='/create' element={<Create />} />
			</Routes>
		</div>
	);

	return (
		Page
	);
};

export default App;