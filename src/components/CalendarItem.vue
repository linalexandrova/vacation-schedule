<template>
    <div>
        <slot name="calendar-item-header">месяц год</slot>
    </div>
    <div class="calendar-item__subtitle">
        <div>пн</div>
        <div>вт</div>
        <div>ср</div>
        <div>чт</div>
        <div>пт</div>
        <div>сб</div>
        <div>вс</div>
    </div>
    <slot name="calendar-item-body">
    </slot>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
    name: 'CalendarItem',
    });
</script>

<style lang="scss" scoped>
    .calendar-item {
        &__subtitle {
            display: grid;
            grid-template-columns: repeat(7, 1fr);

            &>* {
                height: auto;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
            }
        }
    }
</style>