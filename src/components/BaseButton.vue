<template>
    <a :to="to" v-bind="$attrs"></a>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BaseButton',
        props: {
            to: {
                type: String,
                required: true
            }
        },
        computed: {

        },
    });
</script>

<style lang="sass" scoped>

</style>