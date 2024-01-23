const searchBtn = document.getElementById('seachIcon');
const searchBar = document.getElementById('searchBar');


searchBtn.addEventListener('click', () => {
	searchBar.classList.toggle('flex')
	searchBar.classList.toggle('hidden')
})


const url = 'https://api.tvmaze.com/shows';
let currentPage = 1;
const itemsPerPage = 30;

window.addEventListener('DOMContentLoaded', async () => {
	const data = await fetchData(url, currentPage, itemsPerPage);
	bindData(data);
	// Setup event listeners for pagination buttons
	const prevButton = document.getElementById('prevButton');
	const nextButton = document.getElementById('nextButton');
	prevButton.addEventListener('click', () => {
		if (currentPage > 1) {
			currentPage--;
			updatePage(currentPage);
		}
	});
	nextButton.addEventListener('click', () => {
		if (currentPage === 8) {
			currentPage = 0;
		}
		currentPage++;
		updatePage(currentPage);
	});
});

const fetchData = async (url, page, itemsPerPage) => {
	const start = (page - 1) * itemsPerPage;
	const end = start + itemsPerPage;

	const res = await fetch(url);
	const data = await res.json();
	// const pageNo = Math.floor(Number(data.length / 30));
	// pagination(pageNo);
	return data.slice(start, end);
};


const bindData = (data) => {
	const movieContainer = document.getElementById('movieContainer');
	const template = document.getElementById('template');
	movieContainer.innerHTML = '';
	data.forEach(movie => {
		const cardClone = template.content.cloneNode(true);
		fillDataInCard(cardClone, movie);
		movieContainer.appendChild(cardClone);
	});
};
const fillDataInCard = (cardClone, movie) => {
	const movieName = cardClone.querySelector('#movieName');
	const poster = cardClone.querySelector('#poster');
	const CardDate = cardClone.querySelector('#date')
	const ratings = cardClone.querySelector('#ratings')
	movieName.innerHTML = movie.name;
	poster.src = movie.image['original'];
	ratings.innerHTML = movie.rating['average']
	const date = new Date(movie.premiered).getFullYear();
	CardDate.innerHTML = date
}
const updatePage = async (currentPage) => {
	const data = await fetchData(url, currentPage, itemsPerPage);
	bindData(data);
};











