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
	import Icon from '../../atoms/icon/icon.vue';
	import Avatar from '../../atoms/avatar/avatar.vue';
	import Button from '../../atoms/button/button.vue';
	import Dropdown, { type MenuAction } from '../../atoms/dropdown/dropdown.vue';

	const { user } = defineProps<UserActionMenuProps>();

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
			href: '/admin',
		},
	] satisfies MenuAction[];
</script>

<template>
	<Dropdown id="user_action_menu" :actions="actions">
		<Button class="flex items-center gap-2" color="yellow">
			<Avatar :url="user.avatarUrl" />
			<span>{{ user.name }}</span>
			<Icon name="dropdown" />
		</Button>
	</Dropdown>
</template>
