<script lang="ts" setup>
	import { useAutoAnimate } from '@formkit/auto-animate/vue';
	import { useForm } from '@inertiajs/vue3';
	import AlertNote from '@rlanz/design-system/alert-note';
	import Button from '@rlanz/design-system/button';
	import Dialog from '@rlanz/design-system/dialog';
	import Icon from '@rlanz/design-system/icon';
	import { client } from '@rlanz/rpc/client';
	import { ref } from 'vue';
	import LoginForm from '~/components/auth/login_form.vue';
	import { usePageErrors } from '~/composables/use_page_errors';

	const open = ref(false);
	const loginUrl = client.$url('auth.login');

	const errors = usePageErrors();
	const [parent] = useAutoAnimate();

	const form = useForm({
		email: '',
		password: '',
		remember: false,
	});

	function onSubmit() {
		form.post(loginUrl, {
			onSuccess: () => {
				open.value = false;
			},
		});
	}
</script>

<template>
	<Dialog id="login_dialog" v-model="open" title="Se connecter">
		<template #trigger>
			<Button class="flex items-center gap-2" color="yellow">
				<Icon name="user" />
				<span>Se connecter</span>
			</Button>
		</template>

		<template #content>
			<div ref="parent" class="flex flex-col gap-2">
				<AlertNote v-if="errors" type="danger">
					{{ errors }}
				</AlertNote>

				<LoginForm
					v-model:email="form.email"
					v-model:password="form.password"
					v-model:remember="form.remember"
					:loading="form.processing"
					@submit="onSubmit"
				/>
			</div>
		</template>
	</Dialog>
</template>
