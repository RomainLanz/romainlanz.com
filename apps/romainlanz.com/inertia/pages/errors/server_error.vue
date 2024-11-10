<script lang="ts" setup>
	import Error from '~/components/layouts/error.vue';

	defineProps<{
		errorCode: number;
	}>();
</script>

<template>
	<Error
		title="Oups, quelque chose a planté !"
		description="Il semble que notre serveur ait fait une petite pause imprévue. Pas de panique, l’équipe a été immédiatement
					alertée et travaille déjà à résoudre le problème. En attendant, vous pouvez toujours essayer de revenir un peu
					plus tard ou explorer d'autres pages. Merci de votre patience !"
		:error-code="errorCode"
	/>
</template>
