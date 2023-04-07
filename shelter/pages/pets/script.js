document.addEventListener('DOMContentLoaded', function () {
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








// const modals = {
// 	'katrine': document.getElementById('modal__katrine'),
// 	'jennifer': document.getElementById('modal__jennifer'),
// 	'woody': document.getElementById('modal__woody'),
// 	'sophia': document.getElementById('modal__sophia'),
// 	'timmy': document.getElementById('modal__timmy'),
// 	'charly': document.getElementById('modal__charly'),
// 	'scarlett': document.getElementById('modal__scarlett'),
// 	'freddie': document.getElementById('modal__freddie'),
// };

// const body = document.body; // Получаем элемент <body>

// Object.keys(modals).forEach(function (modal) {
// 	if (modals[modal]) {
// 		document.getElementById('open-modal-btn-' + modal).addEventListener('click', function () {
// 			modals[modal].classList.add('open');
// 			body.style.overflow = 'hidden'; // Добавляем стиль для запрета скроллинга
// 		});

// 		const closeBtn = modals[modal].querySelector('.close-my-modal-btn');
// 		if (closeBtn) {
// 			closeBtn.addEventListener('click', function () {
// 				modals[modal].classList.remove('open');
// 				body.style.overflow = ''; // Удаляем стиль для возврата скроллинга
// 			});
// 		}

// 	}

// });









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

const container = document.querySelector('.our-pets__container');
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
if (screenWidth >= 769) {
	numPages = 6;
} else if (screenWidth >= 321) {
	numPages = 8;
} else {
	numPages = 16;
}




function generatePetCards(page) {
	const startIndex = (page - 1) * petsPerPage;
	const endIndex = Math.min(startIndex + petsPerPage, pets.length);
	let pagePets = pets.slice(startIndex, endIndex);


	if (page > 1) {
		pagePets = shuffleArray(pets.slice(0, endIndex)).slice(0, petsPerPage);
	}

	container.innerHTML = '';

	pagePets.forEach(pet => {
		const petCard = document.createElement('div');
		petCard.classList.add('our-pets__block');

		const petImage = document.createElement('img');
		petImage.src = pet.img;
		petImage.alt = pet.name;
		petCard.appendChild(petImage);

		const petName = document.createElement('p');
		petName.innerText = pet.name;
		petCard.appendChild(petName);

		container.appendChild(petCard);
	});
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
updateScoreboard();


firstPageBtn.disabled = true


firstPageBtn.addEventListener('click', handleFirstPageClick);
prevPageBtn.addEventListener('click', handlePrevPageClick);
nextPageBtn.addEventListener('click', handleNextPageClick);
lastPageBtn.addEventListener('click', handleLastPageClick);



