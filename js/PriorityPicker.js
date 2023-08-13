class PriorityPicker {
	constructor() {
		this.SET_PRIORITY_BTN = document.querySelector('.set-priority')
		this.BODY = document.querySelector('body')
		this.MODAL_OVERLAY = document.querySelector('.modal-overlay')

		this.SET_PRIORITY_MODAL_WINDOW = document.querySelector('.set-priority__modal-window')

		this.SAVE_PRIORITY_BTN = document.querySelector('.set-priority__btns .save-priority__btn')
		this.CANCEL_BTN = document.querySelector('.set-priority__btns .cancel-btn')
		this.CLOSE_BTN = document.querySelector('.set-priority__wrapper .close-btn')
		this.priorities = document.querySelectorAll('.priorities__wrapper .priority')

		this.PRIORITIES_WRAPPER = document.querySelector('.priorities__wrapper')

		this.priorityValue = 1
		this.init()
	}

	init() {
		const priorities = document.querySelectorAll('.priority')

		this.SET_PRIORITY_BTN.addEventListener('click', () => {
			this.SET_PRIORITY_MODAL_WINDOW.classList.add('active')
			this.MODAL_OVERLAY.style.zIndex = '3'
		})

		this.PRIORITIES_WRAPPER.addEventListener('click', (e) => {
			const priority = e.target.closest('.priority')


			if (priority) {
				priorities.forEach((priority) => priority.classList.remove('active'))

				this.priorityValue = +priority.querySelector('.priority-value').textContent
				priority.classList.add('active')
			}
		})

		this.SAVE_PRIORITY_BTN.addEventListener('click', () => {
			this.SET_PRIORITY_MODAL_WINDOW.classList.remove('active')
			this.MODAL_OVERLAY.style.zIndex = '2'
		})
		this.CANCEL_BTN.addEventListener('click', () => {
			this.SET_PRIORITY_MODAL_WINDOW.classList.remove('active')
			this.MODAL_OVERLAY.style.zIndex = '2'

			this.priorityValue = 1
			priorities.forEach((priority) => priority.classList.remove('active'))
			priorities[0].classList.add('active')
		})
		this.CLOSE_BTN.addEventListener('click', () => {
			this.SET_PRIORITY_MODAL_WINDOW.classList.remove('active')
			this.MODAL_OVERLAY.style.zIndex = '2'

			this.priorityValue = 1
			priorities.forEach((priority) => priority.classList.remove('active'))
			priorities[0].classList.add('active')
		})
	}
}

export { PriorityPicker }