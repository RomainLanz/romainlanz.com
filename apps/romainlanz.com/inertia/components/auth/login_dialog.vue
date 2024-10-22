<script lang="ts" setup>
	import Button from '@rlanz/design-system/button';
	import Dialog from '@rlanz/design-system/dialog';
	import Icon from '@rlanz/design-system/icon';
	import LoginForm from '~/components/auth/login_form.vue';
</script>

<template>
	<Dialog title="Se connecter">
		<template #trigger>
			<Button class="flex items-center gap-2" color="yellow">
				<Icon name="user" />
				<span>Se connecter</span>
			</Button>
		</template>

		<template #content>
			<LoginForm />
		</template>
	</Dialog>
</template>
