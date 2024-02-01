<template>
    <div :class="['vcalendar-day', classList]"
         @click="$emit('click', parsedDate)">
        <div class="vcalendar-day__inner">
            <slot>
                {{ date }}
            </slot>
        </div>
    </div>
</template>

<script>
    import {dateAfter, dateUntil, isPassed} from '../helpers/dates';

    export default {
        name: 'Day',

        props: {
            year: Number,
            month: Number,
            date: Number,

            /*
            ** Global options
            */
            today: Number,
            chosen: Array,

            /*
            ** Not focused month day
            */
            otherMonth: Boolean,

            /*
            ** Day of a week
            */
            dow: Boolean,

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
            parsedDate() {
                return new Date(this.year, this.month, this.date);
            },

            time() {
                return this.parsedDate.getTime();
            },

            isToday() {
                let d = new Date(this.today);
                return this.year === d.getFullYear()
                    && this.month === d.getMonth()
                    && this.date === d.getDate();
            },

            isActive() {
                if (!this.chosen)
                    return false;

                return this.chosen.includes(this.parsedDate.getTime());
            },

            isDisabled() {
                let val = false;

                if (this.disabledPassed || this.disabledUntil || this.disabledAfter || this.disabledDates?.length) {
                    if (this.disabledPassed)
                        val = isPassed(this.parsedDate);

                    if (this.disabledUntil && !val)
                        val = dateUntil(this.parsedDate, this.disabledUntil);

                    if (this.disabledAfter && !val)
                        val = dateAfter(this.parsedDate, this.disabledAfter);

                    if (this.disabledDates?.length && !val)
                        val = this.disabledDates.includes(this.parsedDate.getTime());

                } else if (this.allowedDates?.length) {
                    val = !this.allowedDates.includes(this.parsedDate.getTime());
                }

                return val;
            },

            classList() {
                return {
                    ['_active']: this.isActive,
                    ['_disabled']: this.isDisabled,

                    ['_dow']: this.dow,
                    ['_in-other-month']: this.otherMonth,
                    ['_is-today']: this.isToday
                };
            }
        }
    };
</script>

<style lang="scss">
    .vcalendar-day {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &._in-other-month {

            .vcalendar-day__inner {
                color: #a2a2a2;
            }
        }

        &._is-today {

            .vcalendar-day__inner {
                background-color: #cbdcf8;
                color: #303030;
            }
        }

        &:hover {

            .vcalendar-day__inner {
                background-color: #ececec;
                color: #303030;
            }
        }

        &._dow {
            pointer-events: none;
            color: #0d56c6;
        }

        &._active {

            .vcalendar-day__inner {
                background-color: #0d56c6;
                color: white;
            }
        }

        &._disabled {
            opacity: .4;
            pointer-events: none;
        }

        &__inner {
            flex-shrink: 0;
            display: block;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            text-align: center;
            line-height: 27px;
            color: #303030;
            transition: all .3s cubic-bezier(0, .4, .4, 1);
        }
    }
</style>
