<script lang="ts">
	export interface UserActionMenuProps {
		user: {
			name: string;
			avatarUrl: string;
			isAdmin: boolean;
		};
	}
</script>

<script lang="ts" setup>
	import { client } from '@rlanz/rpc/client';
	import Icon from '../../atoms/icon/icon.vue';
	import Avatar from '../../atoms/avatar/avatar.vue';
	import Button from '../../atoms/button/button.vue';
	import Dropdown, { type MenuAction } from '../../atoms/dropdown/dropdown.vue';

	const { user } = defineProps<UserActionMenuProps>();
	const adminUrl = client.$url('admin.pages.dashboard');

	const actions = [
		{
			label: 'Profile',
			code: 'profile',
			onClick: () => {
				alert('Profile clicked');
			},
		},
		{
			enabled: user.isAdmin,
			label: 'Administration',
			code: 'admin',
			href: adminUrl,
		},
	] satisfies MenuAction[];
</script>

<template>
	<Dropdown id="user_action_menu" :actions="actions">
		<Button class="flex items-center gap-2" color="yellow">
			<Avatar :url="user.avatarUrl" />
			<span class="hidden min-[460px]:inline-block">{{ user.name }}</span>
			<Icon name="dropdown" />
		</Button>
	</Dropdown>
</template>
