<template>
    <div class="vcalendar-month">
        <ChevronIcon
            left
            class="vcalendar-month__arrow"
            @click="$emit('previous-month')"
        />

        <ul class="vcalendar-month__list">
            <li class="vcalendar-month__value">
                <slot :month="focusedMonth"
                      :month-name="monthName"
                >
                    {{ monthName }}
                </slot>
            </li>
        </ul>

        <ChevronIcon
            right
            class="vcalendar-month__arrow"
            @click="$emit('next-month')"
        />
    </div>
</template>

<script>
import localeList from '../helpers/locale';
import ChevronIcon from './ChevronIcon.vue';

export default {
    name: 'MonthList',

    components: {
        ChevronIcon,
    },

    props: {
        focusedMonth: {
            type: Number,
            default: new Date().getMonth(),
        },

        locale: String,
    },

    computed: {
        monthName() {
            return localeList[this.locale].months()[this.focusedMonth];
        },
    },
};
</script>

<style lang="scss">
.vcalendar-month {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__arrow {
        flex-shrink: 0;
    }

    &__list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &__value {
        margin: 0 10px;
        text-align: center;
        font-weight: 500;
    }
}
</style>
