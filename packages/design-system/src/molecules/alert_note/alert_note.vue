<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const alert = cva("alert", {
  variants: {
    type: {
      info: "info",
      success: "success",
      warning: "warning",
      danger: "danger",
    },
  },
});

const alertIconMap = {
  info: "info",
  success: "success",
  warning: "danger",
  danger: "close-large",
} as const;

type AlertProps = VariantProps<typeof alert>;
</script>

<script lang="ts" setup>
import Icon from "../../atoms/icon/icon.vue";
import { computed } from "vue";

const props = defineProps<{
  type: AlertProps["type"];
}>();

const iconName = computed(() => alertIconMap[props.type]);
</script>

<template>
  <div :class="alert({ type })" role="alert">
    <div class="icon">
      <Icon :name="iconName" />
    </div>

    <slot />
  </div>
</template>

<style scoped>
.alert {
  --bg-color: transparent;
  --border-color: var(--gray-800);
  --text-color: var(--gray-800);
  --icon-color: var(--gray-600);

  align-items: flex-start;
  background-color: var(--bg-color);
  border-radius: var(--rounded);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  display: flex;
  gap: calc(2 * var(--space));
  padding: calc(3 * var(--space)) calc(4 * var(--space));

  .icon {
    color: var(--icon-color);
    flex-shrink: 0;
    height: 20px;
    padding-top: 2px;
    width: 20px;
  }

  &.info {
    --bg-color: var(--cyan-100);
    --border-color: var(--cyan-800);
    --text-color: var(--cyan-800);
    --icon-color: var(--cyan-600);
  }

  &.success {
    --bg-color: var(--lime-100);
    --border-color: var(--lime-800);
    --text-color: var(--lime-800);
    --icon-color: var(--lime-600);
  }

  &.warning {
    --bg-color: var(--yellow-200);
    --border-color: var(--yellow-800);
    --text-color: var(--yellow-800);
    --icon-color: var(--yellow-600);
  }

  &.danger {
    --bg-color: var(--red-100);
    --border-color: var(--red-800);
    --text-color: var(--red-800);
    --icon-color: var(--red-600);
  }
}
</style>
