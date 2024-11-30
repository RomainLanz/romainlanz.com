<script lang="ts" setup>
	import Button from '@rlanz/design-system/button';
	import Table from '@rlanz/design-system/table';
	import { client } from '@rlanz/rpc/client';
	import { usePageTitle } from '~/composables/use_page_title';
	import type { AllRedirectViewModelSerialized } from '#admin/redirects/view_models/all_redirect_view_model';

	const { vm } = defineProps<{
		vm: AllRedirectViewModelSerialized;
	}>();

	usePageTitle('Redirections');

	const newRedirectUrl = client.$url('admin.redirects.create');

	const headers = [
		{
			label: 'Destination',
			key: 'destination',
			cell: 'destination',
		},
		{
			label: 'Slug',
			key: 'slug',
		},
		{
			label: 'Actions',
			key: 'actions',
			cell: 'actions',
		},
	];
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="w-min">
			<Button color="violet" :href="newRedirectUrl">Créer</Button>
		</div>

		<Table :headers :items="vm.redirects">
			<template #destination="{ item }">
				<div class="flex gap-2">
					<a class="underline" :href="item.destination">{{ item.destination }}</a>
				</div>
			</template>

			<template #actions="{ item }">
				<div class="flex gap-2"></div>
			</template>
		</Table>
	</div>
</template>
