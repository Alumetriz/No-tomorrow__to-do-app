const data = [
	{
		title: 'Manage your tasks',
		descr: 'You can easily manage all of your daily tasks in DoMe for free',
		image: '../assets/images/intro1.png'
	},
	{
		title: 'Create daily routine',
		descr: 'In Uptodo  you can create your personalized routine to stay productive',
		image: '../assets/images/intro2.png'
	},
	{
		title: 'Orgonaize your tasks',
		descr: 'You can organize your daily tasks by adding your tasks into separate categories',
		image: '../assets/images/intro3.png'
	}
]

class Intro {
	constructor() {
		this.PRELOADER = document.querySelector('.preloader')

		this.init()
	}

	init() {
		this.PRELOADER.innerHTML = ''
		this.slide = 0
		this.generateIntro()

		if (localStorage.getItem('hidePreloader') === 'true') {
			this.hidePreloader()
		}

		document.addEventListener('click', (e) => {
			const target = e.target
			console.log(this.slide)
			if (target.classList.contains('next-btn') && this.slide < 2) {
				this.slide++
				this.generateIntro()
			} else if (target.classList.contains('back-btn') && this.slide > 0) {
				this.slide--
				this.generateIntro()
			} else if (target.classList.contains('skip-btn')) {
				this.hidePreloader()
			} else if (target.classList.contains('next-btn') && this.slide === 2) {
				this.hidePreloader()
			} else if (target.classList.contains('never-show__btn')) {
				localStorage.setItem('hidePreloader', 'true')
				this.hidePreloader()
			}
		})
	}

	hidePreloader() {
		this.PRELOADER.style.display = 'none'
	}

	generateIntro() {
		this.PRELOADER.innerHTML = ''
		this.PRELOADER.insertAdjacentHTML(
			'beforeend',
			`<div class='preloader__wrapper'>
							<div class='btns__wrapper-up'>
								<button class='skip-btn'>skip</button>
								<button class='never-show__btn'>Never show again</button>
							</div>
							
							<div class='inner-content'>
								<img class='inner-content__img' src='${data[this.slide].image}' alt=''>
								<div class='slider'>
									<span class='slide'></span>
									<span class='slide'></span>
									<span class='slide'></span>
								</div>
								<h2 class='preloader-title'>${data[this.slide].title}</h2>
								<p class='preloader-descr'>${data[this.slide].descr}</p>
							</div>
							
							<div class='btns__wrapper'>
								<button class='back-btn'>back</button>
								<button class='next-btn'>${this.slide < 2 ? 'next' : 'get started'}</button>
							</div>
						</div>`
		)

		const slides = document.querySelectorAll('.slide')
		slides[this.slide].classList.add('active')
	}
}

export { Intro }