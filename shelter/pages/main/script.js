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

