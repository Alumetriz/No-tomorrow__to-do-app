import { categories } from './categoriesData.js'

class CategoryPicker {
	constructor() {
		this.SET_CATEGORY = document.querySelector('.set-tag')
		this.BODY = document.querySelector('body')
		this.MODAL_OVERLAY = document.querySelector('.modal-overlay')

		this.SET_CATEGORY_MODAL_WINDOW = document.querySelector('.set-category__modal-window')
		this.CREATE_NEW_CATEGORY = document.querySelector('.create-new-category')
		this.CATEGORIES_CONTAINER = document.querySelector('.categories__wrapper')

		this.PRIORITIES_WRAPPER = document.querySelector('.priorities__wrapper')

		this.SAVE_CATEGORY_BTN = document.querySelector('.set-category__btns .set-category__btn')
		this.CANCEL_BTN = document.querySelector('.set-category__btns .cancel-btn')
		this.CLOSE_BTN = document.querySelector('.set-category__wrapper .close-btn')

		this.categoriesArray = [...categories]

		this.init()
	}

	init() {
		this.categoriesArray.forEach((category) => {
			this.CREATE_NEW_CATEGORY.insertAdjacentHTML(
				'beforebegin',
				`<div class='category-card'>
								<div class='category-img' style='background-color: ${category.bgColor}'>${category.svgImage}</div>
								<h3 class='category-title'>${category.title}</h3>
							</div>`
			)
		})

		this.SET_CATEGORY.addEventListener('click', () => {
			this.SET_CATEGORY_MODAL_WINDOW.classList.add('active')
			this.MODAL_OVERLAY.style.zIndex = '3'
		})

		this.CLOSE_BTN.addEventListener('click', () => {
			this.SET_CATEGORY_MODAL_WINDOW.classList.remove('active')
			this.MODAL_OVERLAY.style.zIndex = '2'
		})

		this.CATEGORIES_CONTAINER.addEventListener('click', (e) => {
			const category = e.target.closest('.category-card')

			if (category) {
				if (category.classList.contains('create-new-category')) {
					console.log('create new')
				} else {
					const categoryTitle = category.querySelector('.category-title').textContent
					const categoryImage = category.querySelector('.category-img svg').outerHTML
					const categoryBGColor = window.getComputedStyle(category.querySelector('.category-img')).backgroundColor

					this.choosedCategory = {
						categoryTitle,
						categoryImage,
						categoryBGColor
					}

					console.log(this.choosedCategory)
				}
			}
		})
	}
}

export { CategoryPicker }