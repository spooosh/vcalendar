<template>
    <div class="vcalendar-date-l">
        <ul class="vcalendar-date-l__list">
            <li v-for="d in dayOfAWeek"
                :key="`dow${d}`"
                class="vcalendar-date-l__day">
                <Day :key="`dow${d}`"
                     dow>
                    {{ d }}
                </Day>
            </li>

            <li v-for="d in previousMonthDays"
                :key="`previous${d.date}`"
                class="vcalendar-date-l__day">
                <Day :key="`previous${d.date}`"
                     :year="d.year"
                     :month="d.month"
                     :date="d.date"

                     :today="today"
                     :chosen="chosen"
                     other-month

                     :disabled-passed="disabledPassed"
                     :disabled-until="disabledUntil"
                     :disabled-after="disabledAfter"
                     :disabled-dates="disabledDates"

                     :allowed-dates="allowedDates"

                     @click="val => $emit('change', val)"/>
            </li>

            <li v-for="d in currentMonthDays"
                :key="`current${d.date}`"
                class="vcalendar-date-l__day">
                <Day :key="`current${d.date}`"
                     :year="d.year"
                     :month="d.month"
                     :date="d.date"

                     :chosen="chosen"
                     :today="today"

                     :disabled-passed="disabledPassed"
                     :disabled-until="disabledUntil"
                     :disabled-after="disabledAfter"
                     :disabled-dates="disabledDates"

                     :allowed-dates="allowedDates"

                     @click="val => $emit('change', val)"/>
            </li>

            <li v-for="d in nextMonthDays"
                :key="`next${d.date}`"
                class="vcalendar-date-l__day">
                <Day :key="`next${d.date}`"
                     :year="d.year"
                     :month="d.month"
                     :date="d.date"

                     :today="today"
                     :chosen="chosen"
                     other-month

                     :disabled-passed="disabledPassed"
                     :disabled-until="disabledUntil"
                     :disabled-after="disabledAfter"
                     :disabled-dates="disabledDates"

                     :allowed-dates="allowedDates"

                     @click="val => $emit('change', val)"/>
            </li>

        </ul>
    </div>
</template>

<script>
    import locale from '../helpers/locale';
    import {
        getDaysInMonth,
        getFirstWeek,
        getLastWeek
    } from '../helpers/dates';

    import Day from './Day.vue';

    export default {
        name: 'DateList',

        components: {
            Day
        },

        props: {
            /*
            ** Global options
            */
            startWeekDay: Number,
            locale: String,
            chosen: Array,
            focused: Object,
            today: Number,

            /*
            ** Disabled options
            */
            disabledPassed: Boolean,
            disabledUntil: Date,
            disabledAfter: Date,
            disabledDates: Array,

            /*
            ** Allowed options
            */
            allowedDates: Array
        },

        computed: {
            dayOfAWeek() {
                let days = locale[this.locale].dayOfAWeek();

                if (this.startWeekDay) {
                    let firstDays = days.splice(0, this.startWeekDay);
                    days = [...days, ...firstDays];
                }

                return days;
            },

            previousMonthDays() {
                let previousMonth = this.focused.month > 0 ? this.focused.month - 1 : 11;
                let previousYear = this.focused.month > 0 ? this.focused.year : this.focused.year - 1;

                return getLastWeek(previousYear, previousMonth, this.startWeekDay);
            },

            nextMonthDays() {
                let nextMonth = this.focused.month < 11 ? this.focused.month + 1 : 0;
                let nextYear = this.focused.month < 11 ? this.focused.year : this.focused.year + 1;

                let addWeek = Math.floor(6 - (this.previousMonthDays.length + this.currentMonthDays.length) / 7);
                let days = getFirstWeek(nextYear, nextMonth, addWeek, this.startWeekDay);

                return days;
            },

            currentMonthDays() {
                let days = getDaysInMonth(this.focused.year, this.focused.month);

                return days;
            }
        }
    };
</script>

<style lang="scss">
    .vcalendar-date-l {
        display: block;
        font-variant-numeric: tabular-nums;

        &__list {
            display: flex;
            flex-wrap: wrap;
            margin: -4px;
            padding: 0;
            list-style: none;
        }

        &__day {
            flex-shrink: 0;
            flex-grow: 0;
            width: calc(100% / 7);
            padding: 4px;
        }
    }
</style>