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








const modals = {
	'katrine': document.getElementById('modal__katrine'),
	'jennifer': document.getElementById('modal__jennifer'),
	'woody': document.getElementById('modal__woody'),
	'sophia': document.getElementById('modal__sophia'),
	'timmy': document.getElementById('modal__timmy'),
	'charly': document.getElementById('modal__charly'),
	'scarlett': document.getElementById('modal__scarlett'),
	'freddie': document.getElementById('modal__freddie'),
};

const body = document.body; // Получаем элемент <body>

Object.keys(modals).forEach(function (modal) {
	if (modals[modal]) {
		document.getElementById('open-modal-btn-' + modal).addEventListener('click', function () {
			modals[modal].classList.add('open');
			body.style.overflow = 'hidden'; // Добавляем стиль для запрета скроллинга
		});

		const closeBtn = modals[modal].querySelector('.close-my-modal-btn');
		if (closeBtn) {
			closeBtn.addEventListener('click', function () {
				modals[modal].classList.remove('open');
				body.style.overflow = ''; // Удаляем стиль для возврата скроллинга
			});
		}

	}
	
});











