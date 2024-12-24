<script lang="ts" setup>
	import { computed, ref, unref } from 'vue';
	import Button from '../../atoms/button/button.vue';
	import Dialog from '../../molecules/dialog/dialog.vue';
	import Checkbox from '../../atoms/checkbox/checkbox.vue';
	import Field from '../../molecules/field/field.vue';

	const emit = defineEmits<{
		accepted: [];
	}>();

	const { loading = false } = defineProps<{
		errorMessage?: string;
		loading?: boolean;
	}>();

	const email = defineModel<string>('email', { required: true });
	const open = defineModel<boolean>('open', { required: true });

	const acceptTerms = ref(false);

	const isFormValid = computed(() => {
		return acceptTerms.value && unref(email).length > 1;
	});

	function handleSubmit() {
		emit('accepted');
		open.value = false;
	}
</script>

<template>
	<Dialog title="Confirmez votre inscription" v-model="open">
		<template #trigger>
			<Button size="extraSmall">S'abonner</Button>
		</template>

		<template #content>
			<form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
				<Field v-model="email" label="Adresse email" type="email" :error-message="errorMessage" />

				<Checkbox v-model="acceptTerms" label="J'accepte de recevoir la newsletter de RomainLanz" />

				<p class="text-sm text-gray-700">
					Nous utilisons Brevo en tant que plateforme marketing. En soumettant ce formulaire, vous acceptez que les
					données personnelles que vous avez fournies soient transférées à Brevo pour être traitées conformément à la
					<a class="underline" href="https://www.brevo.com/fr/legal/privacypolicy" target="_blank" rel="nofollow">
						politique de confidentialité
					</a>
					de Brevo.
				</p>

				<div class="flex justify-end">
					<Button color="violet" size="small" type="submit" :disabled="!isFormValid">S'abonner</Button>
				</div>
			</form>
		</template>
	</Dialog>
</template>
