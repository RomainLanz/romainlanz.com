<script lang="ts"></script>

<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Logo from '../../atoms/logo/logo.vue';
	import UserActionMenu, { type UserActionMenuProps } from '../../molecules/user_action_menu/user_action_menu.vue';

	defineProps<{
		title?: string | null;
		user?: UserActionMenuProps['user'] | null;
	}>();
</script>

<template>
	<header class="my-10">
		<div class="m-auto max-w-7xl flex items-center justify-between px-4">
			<div class="flex items-center gap-4">
				<h1 v-if="title" class="text-5xl text-gray-800">{{ title }}</h1>

				<Link v-else class="flex items-center gap-2" href="/">
					<Logo />
					<span class="hidden text-xl text-gray-800 font-bold xs:block">Romain Lanz</span>
				</Link>

				<slot name="after-logo" />
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
					<slot name="not-connected" />
				</template>
			</div>
		</div>
	</header>
</template>
