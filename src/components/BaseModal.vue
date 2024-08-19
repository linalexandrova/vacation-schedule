<template>
    <div v-if="isVisible" class="modal__overlay" @click.self="close">
        <div class="modal__content">
            <button @click="close">x</button>
            <slot name="icon">Иконка</slot>
            <slot name="title">Заголовок</slot>
            <slot name="subtitle">Текст</slot>
            <slot name="body">Тело</slot>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BaseModal',
        props: {
            isVisible: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            close() {
                this.$emit('update:isVisible', false);
            }
        },
    });
</script>

<style lang="scss" scoped>
    .modal {
        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
        }
    }
</style>