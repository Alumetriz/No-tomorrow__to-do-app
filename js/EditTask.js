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

		this.CLOSE_BTN = document.querySelector('.nav-btns .close')
		this.REPEAT_BTN = document.querySelector('.nav-btns .repeat')

		this.taskInfo = {
			taskTitle: null,
			taskDescr: null,
			taskDeadline: null,
			taskPriority: null,
			taskCategory: null
		}

		this.init()
	}

	init() {
		console.log(this.TASKS_WRAPPER)
		this.TASKS_WRAPPER.addEventListener('click', (e) => {

			const taskMainInfo = e.target.closest('.task__main-info')
			const task = e.target.closest('.task')

			console.log(task)

			const editTaskBtn = e.target.closest('.options-task__btn')
			if (editTaskBtn) {
				this.TASK_SCREEN.classList.add('active')
				this.BODY.style.overflow = 'hidden'
			}

			console.log(taskMainInfo)
			const title = task.querySelector('.task-title').textContent
			const description = task.querySelector('.task__main-info').dataset.description
			const deadline = task.querySelector('.task-deadline').textContent
			const category = task.querySelector('.category').innerHTML
			task.querySelector('.priority svg').style.fill = '#E8E8E8'
			const priority = task.querySelector('.priority').innerHTML


			this.MODAL_TASK_TITLE.textContent = title
			this.MODAL_TASK_DESCR.textContent = description
			this.DEADLINE_DETAIL.textContent = deadline
			this.CATEGORY_DETAIL.innerHTML = category
			this.PRIORITY_DETAIL.innerHTML = priority
		})

		this.CLOSE_BTN.addEventListener('click', () => {
			this.TASK_SCREEN.classList.remove('active')
			this.BODY.style.overflow = 'auto'
		})


	}
}

export { EditTask }