<template>
    Schedule
    <base-link :to="{ name: 'home' }">
        Home
    </base-link>
</template>

<script>
    import { defineComponent } from 'vue';
    import BaseLink from '@/components/BaseLink.vue';


    export default defineComponent({
        name: 'SchedulePage',
        components: {
            BaseLink,
        }
    });
</script>

<style lang="sass" scoped>

</style>