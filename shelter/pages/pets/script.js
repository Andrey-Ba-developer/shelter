document.addEventListener('DOMContentLoaded', function () { // меню бургер--------------------------------
	const burgerBtn = document.getElementById('burger-btn');
	const header = document.querySelector('.header');
	const body = document.querySelector('body');
	const bodyOverlay = document.createElement('div');
	bodyOverlay.classList.add('body-overlay');

	burgerBtn.addEventListener('click', function () {
		header.classList.toggle('open');
		body.classList.toggle('no-scroll');
		bodyOverlay.classList.toggle('active');
		body.appendChild(bodyOverlay);
	});
	bodyOverlay.addEventListener('click', function () {
		header.classList.remove('open');
		body.classList.remove('no-scroll');
		bodyOverlay.classList.remove('active');
	});

	const burgerLinks = document.querySelectorAll('.header__nav-link-ul-container a');

	burgerLinks.forEach(link => {
		link.addEventListener('click', () => {
			header.classList.remove('open');
			body.classList.remove('no-scroll');
			bodyOverlay.classList.remove('active');
		});
	});
});
// --------------------------------------------------------------------меню бургер--------------------------------








const container = document.querySelector('.our-pets__container');

const modals = {
	'katrine': document.getElementById('katrine'),
	'jennifer': document.getElementById('jennifer'),
	'woody': document.getElementById('woody'),
	'sophia': document.getElementById('sophia'),
	'timmy': document.getElementById('timmy'),
	'charly': document.getElementById('charly'),
	'scarlett': document.getElementById('scarlett'),
	'freddie': document.getElementById('freddie'),
};

const body = document.body;

container.addEventListener('click', function (event) {
	const petCard = event.target.closest('.our-pets__block');
	if (petCard) {
		const modalId = petCard.id.toLowerCase();
		const modal = modals[modalId];
		if (modal) {
			modal.classList.add('open');
			body.style.overflow = 'hidden';
		}
	}
});

Object.keys(modals).forEach(function (modalId) {
	const modal = modals[modalId];
	if (modal) {
		const closeBtn = modal.querySelector('.close-my-modal-btn');
		if (closeBtn) {
			closeBtn.addEventListener('click', function () {
				modal.classList.remove('open');
				body.style.overflow = '';
			});
		}
	}
});









let pets =
	[
		{
			"name": "Jennifer",
			"img": "../../assets/images/pets-jennifer.png",
		},
		{
			"name": "Sophia",
			"img": "../../assets/images/sophia.png",
		},
		{
			"name": "Woody",
			"img": "../../assets/images/pets-woody.png",
		},
		{
			"name": "Scarlett",
			"img": "../../assets/images/pets-scarlet.png",
		},
		{
			"name": "Katrine",
			"img": "../../assets/images/pets-katrine.png",
		},
		{
			"name": "Timmy",
			"img": "../../assets/images/pets-timmy.png",
		},
		{
			"name": "Freddie",
			"img": "../../assets/images/freddie.png",
		},
		{
			"name": "Charly",
			"img": "../../assets/images/pets-charly.png",
		}
	]


const firstPageBtn = document.querySelector('.first-page');
const prevPageBtn = document.querySelector('.prev-page');
const scoreboard = document.querySelector('.pagination__scoreboard');
const nextPageBtn = document.querySelector('.next-page');
const lastPageBtn = document.querySelector('.last-page');


const petsPerPage = 8;
let currentPage = 1;
let numPages;

pets = shuffleArray(pets);

const screenWidth = window.innerWidth;
if (screenWidth < 4800 && screenWidth >= 1280) {
	numPages = 6;
} else if (screenWidth >= 660 && screenWidth <= 1279) {
	numPages = 8;
} else {
	numPages = 16;
}



function updateButtonState() {
	if (currentPage === 1) {
		firstPageBtn.disabled = true;
		prevPageBtn.disabled = true;
		firstPageBtn.classList.add('disabled');
		prevPageBtn.classList.add('disabled');
	} else {
		firstPageBtn.disabled = false;
		prevPageBtn.disabled = false;
		firstPageBtn.classList.remove('disabled');
		prevPageBtn.classList.remove('disabled');
	}

	if (currentPage === numPages) {
		nextPageBtn.disabled = true;
		lastPageBtn.disabled = true;
		nextPageBtn.classList.add('disabled');
		lastPageBtn.classList.add('disabled');
	} else {
		nextPageBtn.disabled = false;
		lastPageBtn.disabled = false;
		nextPageBtn.classList.remove('disabled');
		lastPageBtn.classList.remove('disabled');
	}
}


function generatePetCards(page) {
	const startIndex = (page - 1) * petsPerPage;
	const endIndex = Math.min(startIndex + petsPerPage, pets.length);
	let pagePets = pets.slice(startIndex, endIndex);

	if (page > 1) {
		pagePets = shuffleArray(pets.slice(0, endIndex)).slice(0, petsPerPage);
	}

	container.innerHTML = '';


	let cardId = 1;

	pagePets.forEach(pet => {
		const petCard = document.createElement('div');
		petCard.classList.add('our-pets__block');
		petCard.id = pet.name; // использование имени питомца в качестве id
  
		const petImage = document.createElement('img');
		petImage.src = pet.img;
		petImage.alt = pet.name;
		petCard.appendChild(petImage);
  
		const petName = document.createElement('p');
		petName.innerText = pet.name;
		petCard.appendChild(petName);
  
		const learnMoreBtn = document.createElement('button');
		learnMoreBtn.innerText = 'Learn More';
		petCard.appendChild(learnMoreBtn);
  
		container.appendChild(petCard);
  });

	updateButtonState();
}



function shuffleArray(array) {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const shouldSwap = Math.random() > 0.5;
		if (shouldSwap) {
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		} else {
			const k = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[k]] = [shuffled[k], shuffled[i]];
		}
	}
	return shuffled;
}

function updateScoreboard() {
	scoreboard.innerText = currentPage;
}

function handleFirstPageClick() {
	currentPage = 1;
	generatePetCards(currentPage);
	updateScoreboard();
	firstPageBtn.disabled = true;
	lastPageBtn.disabled = false;
}

function handlePrevPageClick() {
	if (currentPage > 1) {
		currentPage--;
		generatePetCards(currentPage);
		updateScoreboard();
		lastPageBtn.disabled = false;
		if (currentPage === 1) {
			firstPageBtn.disabled = true;
		}
	}
}

function handleNextPageClick() {
	if (currentPage < numPages) {
		currentPage++;
		generatePetCards(currentPage);
		updateScoreboard();
		firstPageBtn.disabled = false;
		if (currentPage === numPages) {
			lastPageBtn.disabled = true;
		}
	}
}

function handleLastPageClick() {
	currentPage = numPages;
	generatePetCards(currentPage);
	updateScoreboard();
	lastPageBtn.disabled = true;
	firstPageBtn.disabled = false;
}


generatePetCards(currentPage);
updateButtonState()
updateScoreboard();



firstPageBtn.disabled = true


firstPageBtn.addEventListener('click', handleFirstPageClick);
prevPageBtn.addEventListener('click', handlePrevPageClick);
nextPageBtn.addEventListener('click', handleNextPageClick);
lastPageBtn.addEventListener('click', handleLastPageClick);



