import { AddTaskModalWindow } from './AddTaskModalWindow.js'

const addTaskModal = new AddTaskModalWindow()

class EditTask {
	constructor() {
		this.TASKS_WRAPPER = document.querySelector('.tasks__wrapper')
		this.OPTIONS_TASK_BTN = document.querySelectorAll('.options-task__btn')
		this.TASK_SCREEN = document.querySelector('.task-screen')
		this.BODY = document.querySelector('body')
		this.MODAL_TASK_TITLE = document.querySelector('.task-text__title')
		this.MODAL_TASK_DESCR = document.querySelector('.task-text__descr')
		this.DEADLINE_DETAIL = document.querySelector('.deadline-detail')
		this.CATEGORY_DETAIL = document.querySelector('.category-detail')
		this.PRIORITY_DETAIL = document.querySelector('.priority-detail')
		this.DONE_TASK_BTN = document.querySelector('.done-task')

		this.DELETE_TASK_BTN = document.querySelector('.delete-task')
		this.TASK_TEXT = document.querySelector('.task-text')
		this.TASK_INPUTS = document.querySelectorAll('.task-text input')
		this.SAVE_CHANGES_BTN = document.querySelector('.save-changes__btn')

		this.CLOSE_BTN = document.querySelector('.nav-btns .close')
		this.REPEAT_BTN = document.querySelector('.nav-btns .repeat')

		this.taskInfo = {
			taskTitle: null,
			taskDescr: null,
			taskDeadline: null,
			taskPriority: null,
			taskCategory: null
		}

		this.choosedTask = null

		this.init()
	}

	init() {
		this.TASKS_WRAPPER.addEventListener('click', (e) => {

			const taskMainInfo = e.target.closest('.task__main-info')
			const task = e.target.closest('.task')
			const editTaskBtn = e.target.closest('.options-task__btn')

			if (editTaskBtn) {
				this.TASK_SCREEN.classList.add('active')
				this.BODY.style.overflow = 'hidden'

				this.choosedTask = task
			}

			const title = task.querySelector('.task-title').textContent
			const description = task.querySelector('.task__main-info').dataset.description
			const deadline = task.querySelector('.task-deadline').textContent
			const category = task.querySelector('.category').innerHTML
			task.querySelector('.priority svg').style.fill = '#E8E8E8'
			const priority = task.querySelector('.priority').innerHTML

			this.MODAL_TASK_TITLE.value = title
			this.MODAL_TASK_DESCR.value = description
			this.DEADLINE_DETAIL.textContent = deadline
			this.CATEGORY_DETAIL.innerHTML = category
			this.PRIORITY_DETAIL.innerHTML = priority
		})

		this.CLOSE_BTN.addEventListener('click', () => {
			this.TASK_SCREEN.classList.remove('active')
			this.BODY.style.overflow = 'auto'
		})

		this.DELETE_TASK_BTN.addEventListener('click', () => {
			this.choosedTask.remove()

			this.TASK_SCREEN.classList.remove('active')
			this.BODY.style.overflow = 'auto'

			this.saveToLocalStorage()
		})

		this.SAVE_CHANGES_BTN.addEventListener('click', () => {
			const newTaskTitle = document.querySelector('.task-text__title').value
			const newTaskDescr = document.querySelector('.task-text__descr').value
			const taskMainInfo = this.choosedTask.querySelector('.task__main-info')

			this.choosedTask.querySelector('.task-title').textContent = newTaskTitle
			taskMainInfo.dataset.description = newTaskDescr

			this.TASK_SCREEN.classList.remove('active')
			this.BODY.style.overflow = 'auto'

			this.saveToLocalStorage()
		})


		this.DONE_TASK_BTN.addEventListener('click', () => {
			this.DONE_TASK_BTN.classList.toggle('active')
			const title = this.choosedTask.querySelector('.task-title')

			if (title.classList.contains('completed')) {
				title.classList.remove('completed')
			} else {
				title.classList.add('completed')
			}

			this.saveToLocalStorage()
		})
	}

	saveToLocalStorage() {
		// Получаем DOM элементы
		addTaskModal.tasks = Array.from(document.querySelectorAll('.task'))

		// Создаем массив для хранения внутреннего HTML каждого элемента
		addTaskModal.tasksInnerHTML = addTaskModal.tasks.map((task) => task.innerHTML)

		// Сохраняем данные в localStorage
		// + Сериализация данных в формат JSON и сохранение в localStorage
		localStorage.setItem('savedElements', JSON.stringify(addTaskModal.tasksInnerHTML))
	}

}

export { EditTask }