// @ts-nocheck

import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.scss';


function App() {
	const [photos, setPhotos] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		if (fetching) {
			console.log('fetching')
			axios
				.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
				.then(response => {
					setPhotos([...photos, ...response.data])
					setCurrentPage(prevState => prevState + 1)
				})
				.finally(() => setFetching(false))
		}
	}, [fetching]);

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)

		return function() {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, []);

	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
			setFetching(true)
		}
	}

	return (
		<div className="App">

			{photos.map(photo  =>
				<div className='photo' key={photo.id}>
					<div className='title'>{photo.id}. {photo.title}</div>
					<img src={photo.thumbnailUrl} alt='puk'/>
				</div>
			)}

		</div>
	);
}


export default App;