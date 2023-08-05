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
        this.DAYS_ELEMENT = document.querySelector('.days');
        this.MONTH_CONTAINER = document.querySelector('.month');
        this.CHOOSE_TIME_BTN = document.querySelector('.choose-time__btn');

        this.HOURS_ELEMENT = document.querySelector('.hours');
        this.MINUTES_ELEMENT = document.querySelector('.minutes');

        this.months = ['January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.date = new Date();
        this.minute = this.date.getMinutes();
        this.hour = this.date.getHours();
        this.day = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();

        this.selectedDate = this.date;
        this.selectedHour = this.hour;
        this.selectedMinute = this.minute;
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
            this.populateTimes();
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

    populateTimes() {
        this.HOURS_ELEMENT.innerHTML = '';
        this.MINUTES_ELEMENT.innerHTML = '';

        let amountOfHours = 24;
        for (let h = 0; h < amountOfHours; h++) {
            const hourElement = document.createElement('div');
            hourElement.classList.add('hour');
            hourElement.textContent = h < 10 ? '0' + h : h;

            if (this.selectedHour === h) {
                hourElement.classList.add('selected');
            }

            hourElement.addEventListener('click', () => {
                this.selectedHour = h;
                this.populateTimes(); // Update time elements when the hour is selected
            })

            this.HOURS_ELEMENT.appendChild(hourElement);
        }

        let amountOfMinutes = 60;
        for (let m = 0; m < amountOfMinutes; m++) {
            const minuteElement = document.createElement('div');
            minuteElement.classList.add('minute');
            minuteElement.textContent = m < 10 ? '0' + m : m;

            if (this.selectedMinute === m) {
                minuteElement.classList.add('selected');
            }

            minuteElement.addEventListener('click', () => {
                this.selectedMinute = m;
                this.populateTimes(); // Update time elements when the minute is selected
            })

            this.MINUTES_ELEMENT.appendChild(minuteElement);
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