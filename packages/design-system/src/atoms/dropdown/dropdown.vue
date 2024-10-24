<script lang="ts">
	export interface MenuAction {
		enabled?: boolean;
		label: string;
		code: string;
		href?: string;
		onClick?: () => void;
	}
</script>

<script lang="ts" setup>
	import { router } from '@inertiajs/vue3';
	import { MenuContent, MenuItem, MenuPositioner, MenuRoot, MenuTrigger } from '@ark-ui/vue';
	import ClientOnly from '../client_only/client_only.ts';

	const { actions } = defineProps<{
		actions: MenuAction[];
	}>();

	function handleSelect(menuItem: { value: string }) {
		const action = actions.find((action) => action.code === menuItem.value);

		if (action?.href) {
			router.visit(action.href);
		}

		action?.onClick?.();
	}
</script>

<template>
	<MenuRoot @select="handleSelect">
		<MenuTrigger as-child>
			<slot />
		</MenuTrigger>

		<ClientOnly>
			<Teleport to="body">
				<MenuPositioner>
					<MenuContent class="bg-white min-w-48 rounded-lg p-2 border-2 border-solid border-gray-800 shadow-small">
						<template v-for="action in actions">
							<MenuItem
								v-if="action.enabled !== false"
								class="cursor-pointer px-2 py-0.5 rounded-ms hover:bg-yellow-300 transition-colors duration-200"
								:id="`${action.code}-menu-action`"
								:code="action.code"
								:value="action.code"
							>
								{{ action.label }}
							</MenuItem>
						</template>
					</MenuContent>
				</MenuPositioner>
			</Teleport>
		</ClientOnly>
	</MenuRoot>
</template>
