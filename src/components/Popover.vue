<template>
    <div class="vcalendar__popover">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Popover'
    };
</script>

<style lang="scss">
    .vcalendar__popover {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px 0 rgba(#303030, .15);
        user-select: none;
    }
</style>