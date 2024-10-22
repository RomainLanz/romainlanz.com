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

	const { backdrop = true } = defineProps<{
		title: string;
		backdrop?: boolean;
	}>();
</script>

<template>
	<DialogRoot>
		<DialogTrigger as-child>
			<slot name="trigger" />
		</DialogTrigger>

		<Teleport to="body">
			<DialogBackdrop v-if="backdrop" class="absolute inset-0 bg-dark opacity-50 z-10" />

			<DialogPositioner class="fixed flex items-center justify-center h-full w-full z-20">
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
			</DialogPositioner>
		</Teleport>
	</DialogRoot>
</template>
