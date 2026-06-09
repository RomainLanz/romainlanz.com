<script lang="ts" setup>
	import Avatar from '../../atoms/avatar/avatar.vue';
	import Button from '../../atoms/button/button.vue';
	import Dropdown, { type MenuAction } from '../../atoms/dropdown/dropdown.vue';
	import Icon from '../../atoms/icon/icon.vue';

	export interface UserActionMenuProps {
		user: {
			name: string;
			avatarUrl: string;
			isAdmin: boolean;
		};
		adminHref?: string;
	}

	const { adminHref, user } = defineProps<UserActionMenuProps>();

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
			href: adminHref,
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
