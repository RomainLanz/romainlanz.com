<script lang="ts" setup>
	import NewsletterConfirmationDialog from './newsletter_confirmation_dialog.vue';
	import Field from '../../molecules/field/field.vue';

	const emit = defineEmits<{
		register: [];
	}>();

	const { loading = false, errorMessage = null } = defineProps<{
		loading?: boolean;
		errorMessage?: string;
	}>();

	const email = defineModel<string>('email', { required: true });
	const open = defineModel<boolean>('open', { required: true });

	function onAccept() {
		emit('register');
	}
</script>

<template>
	<div class="flex flex-col gap-10 w-min">
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
