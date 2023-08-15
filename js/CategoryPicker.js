import { categories } from './categoriesData.js'

class CategoryPicker {
	constructor() {
		this.SET_CATEGORY = document.querySelector('.set-tag')
		this.BODY = document.querySelector('body')
		this.MODAL_OVERLAY = document.querySelector('.modal-overlay')

		this.SET_CATEGORY_MODAL_WINDOW = document.querySelector('.set-category__modal-window')
		this.CATEGORIES_CONTAINER = document.querySelector('.categories__wrapper')

		this.CHOOSE_CATEGORY_BTN = document.querySelector('.set-category__btns .choose-category__btn')
		this.CANCEL_BTN = document.querySelector('.set-category__btns .cancel-btn')
		this.CLOSE_BTN = document.querySelector('.set-category__wrapper .close-btn')
		this.SET_CATEGORY_BTNS = document.querySelector('.set-category__btns')

		this.categoriesArray = [...categories]

		this.choosedCategory = {
			categoryTitle: categories[0].title,
			categoryImage: categories[0].svgImage,
			categoryBGColor: categories[0].bgColor
		}

		this.init()
	}

	init() {
		this.generateCategoryCards()

		this.SET_CATEGORY.addEventListener('click', () => {
			this.SET_CATEGORY_MODAL_WINDOW.classList.add('active')
			this.MODAL_OVERLAY.style.zIndex = '3'
		})

		this.CLOSE_BTN.addEventListener('click', () => {
			this.SET_CATEGORY_MODAL_WINDOW.classList.remove('active')
			this.MODAL_OVERLAY.style.zIndex = '2'

			this.choosedCategory = {
				categoryTitle: categories[0].title,
				categoryImage: categories[0].svgImage,
				categoryBGColor: categories[0].bgColor
			}

			const categoriesArray = document.querySelectorAll('.category-card')
			categoriesArray.forEach((category) => category.querySelector('.category-title').classList.remove('choosed'))
			categoriesArray[0].querySelector('.category-title').classList.add('choosed')
		})

		document.addEventListener('click', (e) => {
			const category = e.target.closest('.category-card')
			const target = e.target

			if (category) {
				if (category.classList.contains('create-new-category')) {
					// TODO: Create new category functionality
					console.log('create new')

					this.generateCreateCategory()
				} else {
					const categoryTitle = category.querySelector('.category-title').textContent
					const categoryImage = category.querySelector('.category-img svg').outerHTML
					const categoryBGColor = window.getComputedStyle(category.querySelector('.category-img')).backgroundColor

					const categoriesArray = document.querySelectorAll('.category-card')
					categoriesArray.forEach((category) => category.querySelector('.category-title').classList.remove('choosed'))
					category.querySelector('.category-title').classList.add('choosed')

					this.choosedCategory = {
						categoryTitle,
						categoryImage,
						categoryBGColor
					}

					console.log('this.choosedCategory = ', this.choosedCategory)
				}
			}
		})

		this.SET_CATEGORY_BTNS.addEventListener('click', (e) => {
			const target = e.target

			if (target.classList.contains('choose-category__btn')) {
				this.SET_CATEGORY_MODAL_WINDOW.classList.remove('active')
				this.MODAL_OVERLAY.style.zIndex = '2'
			} else if (target.classList.contains('cancel-btn')) {
				this.SET_CATEGORY_MODAL_WINDOW.classList.remove('active')
				this.MODAL_OVERLAY.style.zIndex = '2'

				this.choosedCategory = {
					categoryTitle: categories[0].title,
					categoryImage: categories[0].svgImage,
					categoryBGColor: categories[0].bgColor
				}

				const categoriesArray = document.querySelectorAll('.category-card')
				categoriesArray.forEach((category) => category.querySelector('.category-title').classList.remove('choosed'))
				categoriesArray[0].querySelector('.category-title').classList.add('choosed')
			} else if (target.classList.contains('save-category__btn')) {
				this.CATEGORIES_CONTAINER.classList.remove('hidden')
				this.INPUT_CATEGORY_DATA_FORM.classList.add('hidden')

				const svgImage = this.INPUT_CATEGORY_DATA_FORM.querySelector('#inputSvg').value
				const title = this.INPUT_CATEGORY_DATA_FORM.querySelector('#inputTitle').value
				const bgColor = this.INPUT_CATEGORY_DATA_FORM.querySelector('#inputBGColor').value

				if (svgImage && title && bgColor) {
					categories.push({
						svgImage,
						title,
						bgColor
					})
				} else {
					alert('input values')
				}

				this.generateCategoryCards()
			} else if (target.classList.contains('back-btn')) {
				this.CATEGORIES_CONTAINER.classList.remove('hidden')
				this.INPUT_CATEGORY_DATA_FORM.classList.add('hidden')
			}
		})
	}

	generateCategoryCards() {
		this.CATEGORIES_CONTAINER.innerHTML = ''

		this.SET_CATEGORY_BTNS.innerHTML = ''

		this.SET_CATEGORY_BTNS.insertAdjacentHTML(
			'beforeend',
			`<button class='set-category__btn cancel-btn'>cancel</button>
						<button class='set-category__btn choose-category__btn'>add category</button>
						`
		)

		this.CATEGORIES_CONTAINER.insertAdjacentHTML(
			'beforeend',
			`\t\t\t<div class='category-card create-new-category'>
\t\t\t\t<div class='category-img'>
\t\t\t\t\t<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
\t\t\t\t\t\t<g id='SVGRepo_bgCarrier' stroke-width='0'></g>
\t\t\t\t\t\t<g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
\t\t\t\t\t\t<g id='SVGRepo_iconCarrier'>
\t\t\t\t\t\t\t<path d='M4 12H20M12 4V20' stroke='#00A369' stroke-width='2' stroke-linecap='round'
\t\t\t\t\t\t\t\t\t\tstroke-linejoin='round'></path>
\t\t\t\t\t\t</g>
\t\t\t\t\t</svg>
\t\t\t\t</div>
\t\t\t\t<h3 class='category-title'>Create New</h3>
\t\t\t</div>`
		)

		this.CREATE_NEW_CATEGORY = document.querySelector('.create-new-category')
		// this.categoriesArray.forEach((category) => {
		// 	this.CREATE_NEW_CATEGORY.insertAdjacentHTML(
		// 		'beforebegin',
		// 		`<div class='category-card'>
		// 						<div class='category-img' style='background-color: ${category.bgColor}'>${category.svgImage}</div>
		// 						<h3 class='category-title'>${category.title}</h3>
		// 					</div>`
		// 	)
		// })

		categories.forEach((category) => {
			this.CREATE_NEW_CATEGORY.insertAdjacentHTML(
				'beforebegin',
				`<div class='category-card'>
								<div class='category-img' style='background-color: ${category.bgColor}'>${category.svgImage}</div>
								<h3 class='category-title'>${category.title}</h3>
							</div>`
			)
		})

		document.querySelectorAll('.category-title')[0].classList.add('choosed')
	}

	generateCreateCategory() {
		this.CATEGORIES_CONTAINER.classList.add('hidden')
		this.SET_CATEGORY_BTNS.innerHTML = ''

		this.SET_CATEGORY_BTNS.insertAdjacentHTML(
			'beforeend',
			`<button class='set-category__btn back-btn'>back</button>
						<button class='set-category__btn save-category__btn'>save category</button>
						`
		)

		this.CATEGORIES_CONTAINER.insertAdjacentHTML(
			'afterend',
			`<form action='#' class='input-category-data__form'>
																						<label for='inputSvg'></label>
																						<textarea name='inputSvg' id='inputSvg' cols='30' rows='10' placeholder='enter your svg code here'></textarea>
																						
																						<label for='inputTitle'></label>
																						<input type='text' name='inputTitle' id='inputTitle' placeholder='enter your title'>
																						
																						<label for='inputBGColor'></label>
																						<input type='text' name='inputBGColor' id='inputBGColor' placeholder='enter your color in HEX format'>
																					</form>
			`
		)

		this.INPUT_CATEGORY_DATA_FORM = document.querySelector('.input-category-data__form')
	}
}

export { CategoryPicker }