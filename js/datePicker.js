class DatePicker {
    constructor() {
        this.SET_DEADLINE_BTN = document.querySelector('.set-deadline');
        this.BODY = document.querySelector('body');
        this.MODAL_OVERLAY = document.querySelector('.modal-overlay');

        this.SET_DEADLINE_MODAL_WINDOW = document.querySelector('.set-deadline__modal-window');

        this.DATE_PICKER_CONTAINER = document.querySelector('.date-picker');
        this.MTH_ELEMENT = document.querySelector('.date-picker .dates .month .mth');
        this.NEXT_MTH_BTN = document.querySelector('.next-mth')
        this.PREV_MTH_BTN = document.querySelector('.prev-mth');
        this.DATES_ELEMENT = document.querySelector('.dates');
        this.SELECTED_DATE = document.querySelector('.selected-date');
        this.DAYS_ELEMENT = document.querySelector('.days')
        this.MONTH_CONTAINER = document.querySelector('.month');
        this.CHOOSE_TIME_BTN = document.querySelector('.choose-time__btn');


        this.months = ['January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.date = new Date();
        this.day = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();

        this.selectedDate = this.date;
        this.selectedDay = this.day;
        this.selectedMonth = this.month;
        this.selectedYear = this.year;

        this.MTH_ELEMENT.textContent = this.months[this.month] + ' ' + this.year;

        this.choosedTime = null;

        this.init();
    }


    init() {
        this.SET_DEADLINE_BTN.addEventListener('click', (e) => {
            this.SET_DEADLINE_MODAL_WINDOW.classList.add('active');
            this.MODAL_OVERLAY.style.zIndex = '3';

            this.populateDates();
        });

        this.MONTH_CONTAINER.addEventListener('click', (e) => {
            const target = e.target;

            if (target.classList.contains('next-mth')) {
                this.goToNextMonth();
            } else if (target.classList.contains('prev-mth')) {
                this.goToPrevMonth();
            }
        })

        this.CHOOSE_TIME_BTN.addEventListener('click', (e) => {
            this.SET_DEADLINE_MODAL_WINDOW.classList.remove('active');
            this.MODAL_OVERLAY.style.zIndex = '2';

            this.choosedTime = document.querySelector('#set-time').value;

            // Combine the selected date and time into a single Date object
            if (this.choosedTime) {
                const timeParts = this.choosedTime.split(":");
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);

                this.selectedDate.setHours(hours);
                this.selectedDate.setMinutes(minutes);
                this.SELECTED_DATE.textContent = this.formatDate(this.selectedDate);
                this.SELECTED_DATE.dataset.value = this.selectedDate;
            }
        })
    }

    goToNextMonth() {
        this.month++;

        if (this.month > 11) {
            this.month = 0;
            this.year++;
        }

        this.MTH_ELEMENT.textContent = this.months[this.month] + ' ' + this.year;
        this.populateDates();
    }

    goToPrevMonth() {
        this.month--;

        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }

        this.MTH_ELEMENT.textContent = this.months[this.month] + ' ' + this.year;
        this.populateDates();
    }

    populateDates() {
        this.DAYS_ELEMENT.innerHTML = '';

        let amountOfDays = 31;

        if (this.month === 1) {
            amountOfDays = 28;
        }

        for (let i = 0; i < amountOfDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i + 1;

            if (this.selectedDay === (i + 1) &&
                this.selectedYear === this.year &&
                this.selectedMonth === this.month
            ) {
                dayElement.classList.add('selected');
            }

            dayElement.addEventListener('click', () => {
                this.selectedDate = new Date(this.year + '-' + (this.month + 1) + '-' + (i + 1));
                this.selectedDay = (i + 1);
                this.selectedMonth = this.month;
                this.selectedYear = this.year;

                this.SELECTED_DATE.textContent = this.formatDate(this.selectedDate);
                this.SELECTED_DATE.dataset.value = this.selectedDate;

                this.populateDates();
            })

            this.DAYS_ELEMENT.appendChild(dayElement);
        }
    }

    formatDate(d) {
        let day = d.getDate();
        day < 10 ? day = '0' + day : day;

        let month = d.getMonth() + 1;
        month < 10 ? month = '0' + month : month;

        let year = d.getFullYear();

        return day + ' / ' + month + ' / ' + year;
    }
}

export {DatePicker}