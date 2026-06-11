<script lang="ts" setup>
	import Field from '../../molecules/field/field.vue';
	import NewsletterConfirmationDialog from './newsletter_confirmation_dialog.vue';

	const { loading = false, errorMessage } = defineProps<{
		loading?: boolean;
		errorMessage?: string;
	}>();

	const emit = defineEmits<{
		register: [];
	}>();

	const email = defineModel<string>('email', { required: true });
	const open = defineModel<boolean>('open', { required: true });

	function onAccept() {
		emit('register');
	}
</script>

<template>
	<div class="flex w-min flex-col gap-10">
		<p>Abonne-toi pour recevoir les dernières tendances et ressources pour ta veille technique.</p>

		<div class="flex gap-4">
			<Field v-model="email" placeholder="hello@romainlanz.com" type="email" />

			<NewsletterConfirmationDialog
				v-model:email="email"
				v-model:open="open"
				:loading="loading"
				:error-message="errorMessage"
				@accepted="onAccept"
			/>
		</div>
	</div>
</template>
