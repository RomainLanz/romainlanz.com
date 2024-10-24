<script lang="ts" setup>
	import {
		DialogRoot,
		DialogTrigger,
		DialogPositioner,
		DialogBackdrop,
		DialogTitle,
		DialogContent,
		DialogCloseTrigger,
	} from '@ark-ui/vue/dialog';
	import Icon from '../../atoms/icon/icon.vue';
	import Panel from '../../atoms/panel/panel.vue';
	import ClientOnly from '../../atoms/client_only/client_only.ts';

	const {
		backdrop = true,
		lazyMount = true,
		unmountOnExit = true,
	} = defineProps<{
		title: string;
		backdrop?: boolean;
		lazyMount?: boolean;
		unmountOnExit?: boolean;
	}>();
</script>

<template>
	<DialogRoot :lazy-mount="lazyMount" :unmount-on-exit="unmountOnExit">
		<DialogTrigger as-child>
			<slot name="trigger" />
		</DialogTrigger>

		<ClientOnly>
			<Teleport to="body">
				<DialogBackdrop v-if="backdrop" class="absolute inset-0 bg-dark opacity-50" />

				<DialogPositioner class="fixed inset-0 w-screen overflow-y-auto">
					<div class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
						<DialogContent as-child>
							<Panel class="bg-white max-w-2xl w-full">
								<div class="flex items-start justify-between">
									<DialogTitle class="text-4xl">{{ title }}</DialogTitle>

									<DialogCloseTrigger as-child>
										<Icon name="close-large" class="cursor-pointer" />
									</DialogCloseTrigger>
								</div>

								<slot name="content" />
							</Panel>
						</DialogContent>
					</div>
				</DialogPositioner>
			</Teleport>
		</ClientOnly>
	</DialogRoot>
</template>
