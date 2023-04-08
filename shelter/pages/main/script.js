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
// 	'katrine': document.getElementById('katrine'),
// 	'jennifer': document.getElementById('jennifer'),
// 	'woody': document.getElementById('woody'),
// 	'sophia': document.getElementById('sophia'),
// 	'timmy': document.getElementById('timmy'),
// 	'charly': document.getElementById('charly'),
// 	'scarlett': document.getElementById('scarlett'),
// 	'freddie': document.getElementById('freddie'),
// };

// const body = document.body;

// container.addEventListener('click', function (event) {
// 	const petCard = event.target.closest('.our-pets__block');
// 	if (petCard) {
// 		const modalId = petCard.id.toLowerCase();
// 		const modal = modals[modalId];
// 		if (modal) {
// 			modal.classList.add('open');
// 			body.style.overflow = 'hidden';
// 		}
// 	}
// });

// Object.keys(modals).forEach(function (modalId) {
// 	const modal = modals[modalId];
// 	if (modal) {
// 		const closeBtn = modal.querySelector('.close-my-modal-btn');
// 		if (closeBtn) {
// 			closeBtn.addEventListener('click', function () {
// 				modal.classList.remove('open');
// 				body.style.overflow = '';
// 			});
// 		}
// 	}
// });






const container = document.querySelector('.our-friends-content');


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



const prevPageBtn = document.querySelector('.our-friends__icon-block-left');
const nextPageBtn = document.querySelector('.our-friends__icon-block-right');


const petsPerPage = 3;
let currentPage = 1;
let numPages;


pets = shuffleArray(pets);

const petGroups = [];
for (let i = 0; i < pets.length; i += 3) {
  petGroups.push(pets.slice(i, i + 3));
}

let currentGroupIndex = 0;

let lastThreePets = [];

function generatePetCards() {
	container.classList.add('our-friends-content-transition');

  const currentGroup = petGroups[currentGroupIndex];

  const filteredGroup = currentGroup.filter(pet => !lastThreePets.includes(pet));

  let pagePets = filteredGroup;
  while (pagePets.length < 3 && currentGroupIndex < petGroups.length - 1) {
    currentGroupIndex++;
    const nextGroup = petGroups[currentGroupIndex];
    const filteredNextGroup = nextGroup.filter(pet => !lastThreePets.includes(pet));
    pagePets = pagePets.concat(filteredNextGroup.slice(0, 3 - pagePets.length));
  }

  while (pagePets.length < 3 && currentGroupIndex > 0) {
    currentGroupIndex--;
    const prevGroup = petGroups[currentGroupIndex];
    const filteredPrevGroup = prevGroup.filter(pet => !lastThreePets.includes(pet));
    pagePets = filteredPrevGroup.slice(filteredPrevGroup.length - (3 - pagePets.length)).concat(pagePets);
  }

  lastThreePets = pagePets.slice(pagePets.length - 3);

  container.innerHTML = '';

	let cardId = 1;

	pagePets.forEach(pet => {
		const petCard = document.createElement('div');
		petCard.classList.add('our-pets__block');
		petCard.id = pet.name;

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
	setTimeout(() => {
		container.classList.remove('our-friends-content-transition');
	 }, 500);
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





function handlePrevPageClick() {
		generatePetCards(currentPage);
	}

function handleNextPageClick() {
		generatePetCards(currentPage);
		}


		
generatePetCards(currentPage);

prevPageBtn.addEventListener('click', handlePrevPageClick);
nextPageBtn.addEventListener('click', handleNextPageClick);
