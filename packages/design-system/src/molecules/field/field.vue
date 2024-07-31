<script lang="ts" setup>
defineProps<{
  label?: string;
  errorMessage?: string;
  helpMessage?: string;
}>();
</script>

<template>
  <div class="form_group">
    <label v-if="label" class="form_label" for="">{{ label }}</label>

    <!--TODO: Create dedicated component -->

    <span v-if="errorMessage" class="form_error">{{ errorMessage }}</span>
    <span v-else-if="helpMessage" class="form_help">{{ helpMessage }}</span>
  </div>
</template>

<style scoped>
.form_group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form_label {
  color: var(--gray-800);
}

.form_control {
  border: 2px solid var(--gray-800);
  border-radius: var(--rounded);
  background: transparent;
  padding: 0.5rem 1rem;

  &[disabled] {
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--gray-600);
    font-weight: var(--text-bold);
  }
}

.form_group .form_error {
  color: var(--red-500);
  font-size: var(--text-sm);
  text-transform: uppercase;
}

.form_group .form_help {
  color: var(--cyan-500);
  font-size: var(--text-sm);
}
</style>
