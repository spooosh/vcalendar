<template>
    <div class="vcalendar">
        <Popover>
            <YearList
                    :focused-year="focused.year"
                    class="vcalendar__year-list"
                    @previous-year="onPreviousYear"
                    @next-year="onNextYear"
            />
            <MonthList
                    :focused-month="focused.month"
                    :locale="locale"
                    class="vcalendar__month-list"
                    @previous-month="onPreviousMonth"
                    @next-month="onNextMonth"
            />
            <DateList
                    :locale="locale"
                    :start-week-day="startWeekDay"
                    :chosen="chosen"
                    :focused="focused"
                    :today="today"

                    :disabled-passed="disabledPassed"
                    :disabled-until="disabledUntil"
                    :disabled-after="disabledAfter"
                    :disabled-dates="disabledDates"

                    :allowed-dates="allowedDates"

                    class="vcalendar__date-list"
                    @change="onDateChange"
            />
        </Popover>
    </div>
</template>

<script>
    import {getDateTime} from '../helpers/dates';

    import Popover from './Popover.vue';
    import YearList from './YearList.vue';
    import MonthList from './MonthList.vue';
    import DateList from './DateList.vue';

    export default {
        name: 'VCalendar',
        components: {DateList, MonthList, YearList, Popover},
        props: {
            /*
            ** Options
            */
            multiple: {
                type: Boolean,
                default: false
            },

            /*
            ** Language
            */
            locale: {
                type: String,
                default: 'en'
            },

            /*
            ** Disabled dates list
            */
            disabled: {
                type: Array,
                default: () => ([])
            },

            /*
            ** Not disabled dates list
            */
            allowed: {
                type: Array,
                default: () => ([])
            },

            /*
            ** Allow empty chosen
            ** default chosen if false: today
            */
            allowEmpty: {
                type: Boolean,
                default: false
            },

            /*
            ** Week first day index
            ** @default: 0 - Sunday
            */
            startWeekDay: {
                type: Number,
                default: 0
            }
        },

        data() {
            return {
                chosen: [],

                focused: {
                    date: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear()
                }
            };
        },

        computed: {
            today() {
                return getDateTime(new Date());
            },

            /*
            ** Disabled options
            */
            disabledPassed() {
                return this.disabled.includes('passed');
            },

            disabledUntil() {
                let param = this.disabled.filter(i => i.indexOf('until') > -1);

                if (!param.length) return null;

                param = param[0];
                let date = param.split(' ')[1];
                date = getDateTime(date);

                return date ? new Date(date) : null;
            },

            disabledAfter() {
                let param = this.disabled.filter(i => i.indexOf('after') > -1);

                if (!param.length) return null;

                param = param[0];
                let date = param.split(' ')[1];
                date = getDateTime(Date.parse(date));

                return date ? new Date(date) : null;
            },

            disabledDates() {
                let dates = this.disabled?.length
                    ? this.disabled.filter(i => i.indexOf('until') < 0 && i.indexOf('after') < 0)
                    : [];

                return dates.filter(i => Date.parse(i)).map(i => getDateTime(i));
            },

            /*
            ** Allowed dates
            */
            allowedDates() {
                let dates = this.allowed?.length
                    ? this.allowed.filter(i => Date.parse(i)).map(i => getDateTime(i))
                    : [];

                return dates;
            }
        },

        created() {
            this.setInitialDates();
        },

        methods: {
            /*
            ** Events methods
            */
            onPreviousMonth() {
                this.focused.month = this.focused.month > 0 ? this.focused.month - 1 : 11;

                if (this.focused.month === 11)
                    this.focused.year -= 1;
            },

            onNextMonth() {
                this.focused.month = this.focused.month < 11 ? this.focused.month + 1 : 0;

                if (!this.focused.month)
                    this.focused.year += 1;
            },

            onPreviousYear() {
                this.focused.year -= 1;
            },

            onNextYear() {
                this.focused.year += 1;
            },

            onDateChange(val) {
                let m = val.getMonth();
                let y = val.getFullYear();
                let time = val.getTime();

                this.focused.month = m;
                this.focused.year = y;

                this.chosen.includes(time)
                    ? this.removeChosenDate(time)
                    : this.addChosenDate(time);
            },

            /*
            ** Methods
            */
            addChosenDate(val) {
                this.multiple
                    ? this.chosen.push(val)
                    : this.chosen = [...[val]];

                this.emitChange();
            },

            removeChosenDate(val) {
                const remove = () => {
                    this.multiple
                        ? this.chosen = this.chosen.filter(d => d !== val).slice()
                        : this.chosen = [...[]];
                };

                if (this.allowEmpty) {
                    remove();
                } else if (this.chosen?.length > 1) {
                    remove();
                }

                this.emitChange();
            },

            setInitialDates() {
                if (this.allowedDates?.length) {
                    let dates = this.allowedDates.slice();
                    dates.sort((a, b) => a - b);

                    let firstDate = dates[0];
                    let d = new Date(firstDate);

                    this.focused.year = d.getFullYear();
                    this.focused.month = d.getMonth();

                    if (!this.allowEmpty) {
                        this.chosen = [dates[0]];
                        this.emitChange();
                    }
                } else {
                    this.setInitialChosen();
                }
            },

            setInitialChosen() {
                if (!this.allowEmpty) {
                    this.chosen = [this.today.getTime()];

                    this.emitChange();
                }
            },

            /*
            ** Emitters
            */

            emitChange() {
                this.$emit('change', this.chosen);
            }
        }
    };
</script>

<style lang="scss">
    .vcalendar {
        display: block;
        width: 320px;
        box-sizing: border-box;

        * {
            box-sizing: inherit;
        }

        &__year-list,
        &__month-list {
            flex-shrink: 0;
            margin-bottom: 8px;
        }

        &__year-list {
            width: 50%;
        }

        &__month-list {
            width: 80%;
        }

        &__date-list {
            flex-shrink: 0;
        }
    }
</style>