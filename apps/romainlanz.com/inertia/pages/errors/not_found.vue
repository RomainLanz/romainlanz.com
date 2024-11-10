<script lang="ts" setup>
	import Button from '@rlanz/design-system/button';
	import Error from '~/components/layouts/error.vue';
</script>

<template>
	<Error
		title="Oups ! Il semblerait que vous vous soyez perdu."
		description="La page que vous cherchez a pris la fuite, ou peut-être qu'elle ne nous a jamais rejoint. Ne vous inquiétez pas,
			vous êtes toujours à bord ! Essayez de retourner à l'accueil ou de suivre les liens plus bas. Qui sait, la page
			que vous cherchez pourrait réapparaître !"
		:error-code="404"
	>
		<template #actions>
			<Button href="/" color="cyan"> Retourner à l'accueil </Button>
		</template>
	</Error>
</template>
