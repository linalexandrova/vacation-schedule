<template>
    <router-link v-if="!isExternal" :to="to">
        <slot></slot>
    </router-link>
    <a v-else :href="to" target="_blank">
        <slot></slot>
    </a>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BaseLink',
        props: {
            to: {
                type: String,
                required: true
            }
        },
        computed: {
            isExternal() {
                return /^(https?:|mailto:|tel:)/.test(this.to);
            }
        }
    });
</script>

<style lang="scss" scoped>
    .router-link-active {
        color: grey;
    }
</style>