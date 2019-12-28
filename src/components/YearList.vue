<template>
    <div class="vcalendar-year">
        <ChevronIcon
                left
                class="vcalendar-year__arrow"
                @click="$emit('previous-year')"/>

        <ul class="vcalendar-year__list">
            <li class="vcalendar-year__value">{{ focusedYear }}</li>
        </ul>

        <ChevronIcon
                right
                class="vcalendar-year__arrow"
                @click="$emit('next-year')"/>
    </div>
</template>

<script>
    import ChevronIcon from './ChevronIcon.vue';

    export default {
        name: 'YearList',

        components: {
            ChevronIcon
        },

        props: {
            focusedYear: {
                type: Number,
                default: new Date().getFullYear()
            }
        }
    };
</script>

<style lang="scss">
    .vcalendar-year {
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
            font-weight: 500;
        }
    }
</style>