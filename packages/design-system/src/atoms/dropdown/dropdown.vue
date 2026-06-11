<script lang="ts" setup>
	import { MenuContent, MenuItem, MenuPositioner, MenuRoot, MenuTrigger } from '@ark-ui/vue/menu';
	import { router } from '@inertiajs/vue3';
	import ClientOnly from '../client_only/client_only.ts';

	export interface MenuAction {
		enabled?: boolean;
		label: string;
		code: string;
		href?: string;
		onClick?: () => void;
	}

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
					<MenuContent class="shadow-small min-w-48 rounded-lg border-2 border-solid border-gray-800 bg-white p-2">
						<template v-for="action in actions">
							<MenuItem
								v-if="action.enabled !== false"
								:id="`${action.code}-menu-action`"
								:key="action.code"
								class="rounded-ms cursor-pointer px-2 py-0.5 transition-colors duration-200 hover:bg-yellow-300"
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
