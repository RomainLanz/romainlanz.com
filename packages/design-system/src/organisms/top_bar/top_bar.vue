<script lang="ts"></script>

<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Logo from '../../atoms/logo/logo.vue';
	import Icon from '../../atoms/icon/icon.vue';
	import Button from '../../atoms/button/button.vue';
	import LiveStatus from '../../atoms/live_status/live_status.vue';
	import UserActionMenu, { type UserActionMenuProps } from '../../molecules/user_action_menu/user_action_menu.vue';

	defineProps<{
		user?: UserActionMenuProps['user'];
		isLive: boolean;
	}>();
</script>

<template>
	<header>
		<div class="flex items-center justify-between max-w-6xl px-4 m-auto">
			<div class="flex items-center gap-4">
				<Link class="flex items-center gap-2" href="/">
					<Logo />
					<span class="text-gray-800 text-xl font-bold">Romain Lanz</span>
				</Link>

				<LiveStatus v-if="isLive" />
			</div>

			<div>
				<nav></nav>

				<!-- User is connected -->
				<template v-if="user">
					<div class="flex items-center gap-3">
						<UserActionMenu :user="user" />
					</div>
				</template>

				<!-- User is not connected -->
				<template v-else>
					<Button class="flex items-center gap-2" color="yellow" href="/">
						<Icon name="user" />
						<span>Se connecter</span>
					</Button>
				</template>
			</div>
		</div>
	</header>
</template>
