<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const tag = cva("tag", {
  variants: {
    color: {
      cyan: "cyan",
      violet: "violet",
      red: "red",
      yellow: "yellow",
      lime: "lime",
    },
  },
});

type TagProps = VariantProps<typeof tag>;
</script>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  color?: TagProps["color"];
  href?: string;
}>();

const spanOrLink = computed(() => {
  return props.href ? "a" : "span";
});
</script>

<template>
  <Component
    v-bind="$attrs"
    :is="spanOrLink"
    :class="
      tag({
        color: props.color,
      })
    "
  >
    <slot />
  </Component>
</template>

<style scoped>
a.tag {
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-tiny);
  }
}

.tag {
  --bg-color: var(--white);
  background-color: var(--bg-color);
  border-radius: var(--rounded-sm);
  border: 1px solid var(--gray-800);
  color: var(--gray-800);
  font-size: var(--text-utility);
  letter-spacing: 0.05em;
  line-height: 1;
  padding: 0.375rem 0.5rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: box-shadow 200ms ease-in-out;
  will-change: box-shadow;

  &.cyan {
    --bg-color: var(--cyan-300);
  }

  &.violet {
    --bg-color: var(--violet-300);
  }

  &.yellow {
    --bg-color: var(--yellow-300);
  }

  &.red {
    --bg-color: var(--red-300);
  }

  &.lime {
    --bg-color: var(--lime-300);
  }
}
</style>
