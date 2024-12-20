<script lang="ts" setup>
	import { ref, unref } from 'vue';
	import NewsletterConfirmationDialog from './newsletter_confirmation_dialog.vue';
	import Field from '../../molecules/field/field.vue';

	const emit = defineEmits<{
		register: [email: string];
	}>();

	const email = ref('');

	function onAccept() {
		emit('register', unref(email));
	}
</script>

<template>
	<div class="flex flex-col gap-10 w-min">
		<p>Abonne-toi pour recevoir les dernières tendances et ressources pour ta veille technique.</p>

		<div class="flex gap-4">
			<Field class="h-full" v-model="email" placeholder="hello@romainlanz.com" type="email" />

			<NewsletterConfirmationDialog v-model="email" @accepted="onAccept" />
		</div>
	</div>
</template>
