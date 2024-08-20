<template>
  <base-link :to="{ name: 'home' }"> График отпусков </base-link>

  <base-link :to="{ name: 'schedule' }"> График отсутствий </base-link>

  <base-link to="https://google.com/"> Внешняя ссылка </base-link>

  <base-button text="Модалка" @click="openModal"> </base-button>

  <base-modal :is-visible="isModalVisible" @update:is-visible="isModalVisible = $event">
    <template #icon>
      <img src="../assets/download-doc-icon.svg" alt="" />
    </template>
    <template #title>
      <h1>Завершить бизнес-процесс?</h1>
    </template>
    <template #subtitle>
      <p>
        Завершая бизнес-процесс Вы выгружаете данные по графикам отпусков в 1С. Данное действие
        изменить будет нельзя.
      </p>
    </template>
    <template #body>
      <base-button text="Отменить"> </base-button>
      <base-button text="Завершить"> </base-button>
    </template>
  </base-modal>
  <calendar-list></calendar-list>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseLink from '@/components/BaseLink.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import CalendarList from '@/components/CalendarList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    BaseLink,
    BaseButton,
    BaseModal,
    CalendarList,
  },
  setup() {
    //(props, context)
    const isModalVisible = ref(false);

    function openModal() {
      isModalVisible.value = true;
    }

    return {
      isModalVisible,
      openModal,
    };
  },
});
</script>

<style lang="sass" scoped></style>
