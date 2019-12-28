<template>
    <div :class="[$style.ChevronIcon, classList]"
         @click="$emit('click')">
        <svg viewBox="0 0 20 20"
             :class="$style.svg">
            <path d="M10,16c-0.5,0-1-0.2-1.4-0.6l-8-8c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0l6.6,6.6l6.6-6.6c0.8-0.8,2-0.8,2.8,0 c0.8,0.8,0.8,2,0,2.8l-8,8C11,15.8,10.5,16,10,16z"/>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'ChevronIcon',

        props: {
            left: Boolean,
            right: Boolean
        },

        computed: {
            classList() {
                return {
                    [this.$style._left]: this.left,
                    [this.$style._right]: this.right
                };
            }
        }
    };
</script>

<style lang="scss" module>
    .ChevronIcon {
        display: block;
        width: 12px;
        height: 12px;
        color: #303030;
        opacity: 1;
        transition: all .3s cubic-bezier(0, .4, .4, 1);
        cursor: pointer;

        &:hover {
            color: #0d56c6;
        }
    }

    ._left {
        transform: translate3d(0, 0, 0) rotate(90deg);
    }

    ._right {
        transform: translate3d(0, 0, 0) rotate(-90deg);
    }

    .svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: currentColor;
    }
</style>