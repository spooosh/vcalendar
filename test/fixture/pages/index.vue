<template>
    <div :class="$style.Index">

        <h1 :class="$style.title">VDatepicker</h1>
        <div :class="$style.form"
             @mouseenter="onMouseEnter"
             @mouseleave="onMouseLeave">
            <input :value="inputValues"
                   disabled
                   :class="['ui-input', $style.input]"/>

            <div v-show="isVisible"
                 :class="$style.calendar">
                <VCalendar
                    v-model="dates"
                    locale="ru"
                    :disabled="[`until ${today}`]"
                >
                    <template #month="props">
                        {{ props.monthName }} {{ props.year }}
                    </template>
                </VCalendar>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',

        data() {
            return {
                dates: [],
                isVisible: false,
                visibleTimeout: null
            };
        },

        computed: {
            today() {
                let t = new Date();

                return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}`;
            },

            inputValues() {
                return this.dates.map((d, index) => {
                    let date = new Date(d);

                    let str = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

                    if (index !== this.dates.length - 1)
                        str += ' ';

                    return str;
                });
            }
        },

        methods: {
            onMouseEnter() {
                clearTimeout(this.visibleTimeout);
                this.isVisible = true;
            },

            onMouseLeave() {
                this.visibleTimeout = setTimeout(() => {
                    this.isVisible = false;
                }, 20);
            }
        }
    };
</script>

<style lang="scss" module>
    .Index {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form {
        position: relative;
    }

    .input {
        padding: 6px 12px;
        border: 1px solid $c-grey-light;
        border-radius: 4px;
        user-select: none;
    }

    .calendar {
        position: absolute;
        top: calc(100% + 6px);
        left: 50%;
        transform: translate3d(-50%, 0, 0);
    }
</style>
