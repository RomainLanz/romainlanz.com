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

	const model = defineModel<boolean>();
</script>

<template>
	<DialogRoot v-model:open="model" :lazy-mount="lazyMount" :unmount-on-exit="unmountOnExit">
		<DialogTrigger as-child>
			<slot name="trigger" />
		</DialogTrigger>

		<ClientOnly>
			<Teleport to="body">
				<DialogBackdrop v-if="backdrop" class="fixed inset-0 bg-dark opacity-50" />

				<DialogPositioner class="fixed inset-0 w-screen overflow-y-auto">
					<div class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
						<DialogContent as-child>
							<div
								class="bg-off-white max-w-2xl w-full border-2 border-solid border-gray-800 shadow-small rounded-2xl p-6"
							>
								<div class="flex items-start justify-between">
									<DialogTitle class="text-4xl mb-4">{{ title }}</DialogTitle>

									<DialogCloseTrigger as-child>
										<Icon name="close-large" class="cursor-pointer" />
									</DialogCloseTrigger>
								</div>

								<slot name="content" />
							</div>
						</DialogContent>
					</div>
				</DialogPositioner>
			</Teleport>
		</ClientOnly>
	</DialogRoot>
</template>
