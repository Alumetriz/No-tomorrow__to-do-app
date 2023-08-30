import { DatePicker } from './DatePicker.js'
import { PriorityPicker } from './PriorityPicker.js'
import { CategoryPicker } from './CategoryPicker.js'
import { categories } from './categoriesData.js'

const datePicker = new DatePicker()
const priority = new PriorityPicker()
const category = new CategoryPicker()

class AddTaskModalWindow {
	constructor() {
		this.ADD_TASK__BTN = document.querySelector('.add-task__btn')
		this.MODAL_OVERLAY = document.querySelector('.modal-overlay')
		this.ADD_TASK__MODAL = document.querySelector('.add-task__modal')
		this.TASK_TITLE = document.querySelector('#task-title')
		this.TASK_DESCR = document.querySelector('#task-descr')
		this.TASK_CONTAINER = document.querySelector('.tasks__wrapper')
		this.BODY = document.querySelector('body')

		this.tasks = null
		this.tasksCounter = 0

		this.init()
	}

	init() {
		// Получаем сохраненные данные из localStorage
		const savedElementsJSON = localStorage.getItem('savedElements')

		if (savedElementsJSON) {
			// Десериализация JSON-строки обратно в JavaScript массив
			const savedTasksInnerHTML = JSON.parse(savedElementsJSON)

			// Создаем новые элементы DOM на основе сохраненных данных и добавляем их на страницу
			savedTasksInnerHTML.forEach((innerHTML) => {
				const taskElement = document.createElement('div')
				taskElement.classList.add('task')
				taskElement.innerHTML = innerHTML
				this.TASK_CONTAINER.appendChild(taskElement)
			})
		}

		this.ADD_TASK__BTN.addEventListener('click', (e) => {
			this.MODAL_OVERLAY.classList.add('active')
			this.ADD_TASK__MODAL.classList.add('active')

			this.BODY.style.overflow = 'hidden'
		})

		this.ADD_TASK__MODAL.addEventListener('click', (e) => {
			this.addTask(e.target)
		})
	}

	addTask(target) {
		if (target.closest('.close-btn')) {
			this.hideAddTasksModal()
			this.resetFormsData()
		} else if (target.closest('.send-task')) {
			console.log(this.TASK_TITLE.value, this.TASK_DESCR.value)

			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
				'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

			const hours = datePicker.selectedHour
			const minutes = datePicker.selectedMinute

			const date = `${datePicker.selectedDate.getDate()} ${months[datePicker.selectedDate.getUTCMonth()]} at ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
			// console.log(category.choosedCategory.categoryTitle)
			this.TASK_CONTAINER.insertAdjacentHTML(
				'beforeend',
				`<div class='task'>
                    <svg class='options-task__btn' xmlns='http://www.w3.org/2000/svg' height='1em'
                         viewBox='0 0 448 512'>
                        <path d='M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z'/>
                    </svg>

                    <div class='task__main-info' data-description='${this.TASK_DESCR.value}' data-counter='${this.tasksCounter++}'>
                        <h2 class='task-title'>${this.TASK_TITLE.value}</h2>
                        <p class='task-deadline'>${date}</p>
                    </div>

                    <div class='task__part-info'>
                        <div class='category' style='background-color: ${category.choosedCategory.categoryBGColor}'>
													  ${category.choosedCategory.categoryImage}
                            <span class='choosed-category-title'>${category.choosedCategory.categoryTitle}</span>
                        </div>
                        <div class='priority'>
                            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                                <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                                <g id='SVGRepo_iconCarrier'>
                                    <path fill-rule='evenodd' clip-rule='evenodd'
                                          d='M5 1C4.44772 1 4 1.44772 4 2V22C4 22.5523 4.44772 23 5 23C5.55228 23 6 22.5523 6 22V14H19C19.3603 14 19.6927 13.8062 19.8702 13.4927C20.0477 13.1792 20.0429 12.7944 19.8575 12.4855L17.1662 8L19.8575 3.5145C20.0429 3.20556 20.0477 2.82081 19.8702 2.5073C19.6927 2.19379 19.3603 2 19 2L6 2C6 1.44772 5.55228 1 5 1ZM6 4V12H17.2338L15.1425 8.5145C14.9525 8.19781 14.9525 7.80219 15.1425 7.4855L17.2338 4H6Z'
                                    ></path>
                                </g>
                            </svg>
                            <span class='priority-value'>${priority.priorityValue}</span>
                        </div>
                    </div>
                </div>`
			)

			this.hideAddTasksModal()
			this.resetFormsData()

			// Получаем DOM элементы
			this.tasks = Array.from(document.querySelectorAll('.task'))

			// Создаем массив для хранения внутреннего HTML каждого элемента
			this.tasksInnerHTML = this.tasks.map((task) => task.innerHTML)

			// Сохраняем данные в localStorage
			// + Сериализация данных в формат JSON и сохранение в localStorage
			localStorage.setItem('savedElements', JSON.stringify(this.tasksInnerHTML))
		}
	}

	resetFormsData() {
		this.TASK_TITLE.value = ''
		this.TASK_DESCR.value = ''

		datePicker.date = new Date()

		datePicker.minute = datePicker.date.getMinutes()
		datePicker.hour = datePicker.date.getHours()
		datePicker.day = datePicker.date.getDate()
		datePicker.month = datePicker.date.getMonth()
		datePicker.year = datePicker.date.getFullYear()

		datePicker.selectedDate = datePicker.date
		datePicker.selectedMinute = datePicker.minute
		datePicker.selectedHour = datePicker.hour
		datePicker.selectedDay = datePicker.day
		datePicker.selectedMonth = datePicker.month
		datePicker.selectedYear = datePicker.year

		datePicker.SELECTED_DATE.textContent = datePicker.formatDate(datePicker.selectedDate)
		datePicker.SELECTED_DATE.dataset.value = datePicker.selectedDate

		priority.priorityValue = 1
		priority.priorities.forEach((priority) => priority.classList.remove('active'))
		Array.from(priority.priorities)[0].classList.add('active')

		category.choosedCategory = {
			categoryTitle: categories[0].title,
			categoryImage: categories[0].svgImage,
			categoryBGColor: categories[0].bgColor
		}

		const categoriesArray = document.querySelectorAll('.category-card')
		categoriesArray.forEach((category) => category.querySelector('.category-title').classList.remove('choosed'))

		document.querySelectorAll('.category-title')[0].classList.add('choosed')
	}

	hideAddTasksModal() {
		this.MODAL_OVERLAY.classList.remove('active')
		this.ADD_TASK__MODAL.classList.remove('active')
		this.BODY.style.overflow = 'auto'
	}
}

export { AddTaskModalWindow }


// JSON and DOM (empty array bug)
// объекты DOM (например, HTMLElement) не могут быть преобразованы непосредственно в строку JSON с помощью JSON.stringify(). В результате вы получаете пустой массив.

// Для сохранения элементов DOM в localStorage вам следует сначала преобразовать данные элементов в формат,
// который может быть сериализован в JSON. В вашем случае, это может быть просто массивом строк, содержащими внутренний HTML каждого элемента.