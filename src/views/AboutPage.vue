<template>
    <div>
        About
    </div>
    <base-link :to="{ name: 'home' }">
        График отпусков
    </base-link>
</template>

<script>
    import { defineComponent } from 'vue';
    import BaseLink from '@/components/BaseLink.vue';

    export default defineComponent({
        name: 'AboutPage',
        components: {
            BaseLink
        }
    });
</script>

<style lang="sass" scoped>
    
</style>