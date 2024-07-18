<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  options: {
    label: string | number;
    value: string | number | boolean | object;
  }[];
  value: string | number | boolean | object;
  placeholder?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (event: 'change', value: string): void;
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value;
  emit('change', selectedValue);
};
</script>

<template>
  <div class="select-wrapper">
    <select
      id="select-ui"
      class="select"
      name="select-ui"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="handleChange"
    >
      <option v-for="(option, key) in options" :key="key" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fafafa;
}

.select {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.select:focus {
  outline: none;
}
</style>
