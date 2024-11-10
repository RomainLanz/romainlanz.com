<script setup lang="ts">
	import Highlight from '@rlanz/design-system/highlight';
</script>

<template>
	<section class="mx-auto mt-24 max-w-[80ch] px-4">
		<h1 class="mb-8">À Propos</h1>

		<div class="mx-auto max-w-[80ch] text-lg space-y-8" :class="$style.content">
			<p>
				Je suis <Highlight color="violet.300" :rotation="1">Romain Lanz</Highlight>, développeur full-stack passionné
				avec plus de <Highlight color="lime.300" :rotation="-1">10 ans d'expérience</Highlight> dans le développement
				web. Ici, je partage non seulement mes connaissances en JavaScript, TypeScript et Node.js, mais aussi mon
				parcours et ma vision du développement. Si vous êtes curieux d'en savoir plus sur mon histoire, mes projets et
				mes méthodes d'apprentissage, vous êtes au bon endroit !
			</p>

			<p>
				Ce site est entièrement <Highlight color="cyan.300" :rotation="-1">Open Source</Highlight> et son code est
				disponible <a href="https://github.com/RomainLanz/romainlanz.com" target="_blank" rel="nofollow">sur GitHub</a>,
				afin que vous puissiez l'explorer et l'utiliser à des fins d'apprentissage. Le design a été réalisé par
				<a href="#" target="_blank" rel="nofollow">Louis Burgard</a>, dont le travail apporte une touche moderne et
				intuitive à l'expérience utilisateur. N'hésitez pas à contribuer ou à poser des questions, l'idée étant de
				partager et d'apprendre ensemble.
			</p>

			<h2 id="mon-parcours">
				<a href="#mon-parcours">Mon parcours</a>
			</h2>

			<p>
				En Suisse, à 15 ans, après avoir terminé l'école obligatoire, le choix se pose : continuer les études ou entrer
				dans le monde professionnel. Pour ma part, j'ai choisi de poursuivre mes études et de m'orienter vers une école
				spécialisée en informatique généraliste. Cela m'a permis d'obtenir mon
				<Highlight color="red.300" :rotation="1">CFC d'Informaticien</Highlight> en quatre ans.
			</p>

			<p>
				Une fois diplômé, j'ai décidé de me spécialiser davantage en développement et j'ai continué mes études pour
				obtenir mon diplôme d'<Highlight color="yellow.300" :rotation="-1">École supérieure</Highlight> en deux ans. Ce
				parcours m'a permis de poser des bases solides dans le domaine de l'informatique et de me concentrer sur le
				développement de compétences avancées en programmation.
			</p>

			<p>
				Pendant mes études pour obtenir mon CFC, il était obligatoire de réaliser un stage d'une année en entreprise.
				Pour <Highlight color="lime.300" :rotation="-1">mon premier stage</Highlight>, qui a marqué ma toute première
				expérience réelle dans le monde professionnel, j'ai rejoint le service informatique de l'<a
					href="https://eracom.ch"
					target="_blank"
					rel="nofollow"
					>ERACOM</a
				>, une école d'art située à Lausanne.
			</p>

			<p>
				J'ai également eu la chance de bénéficier des conseils et de l'expérience de mon père, développeur dans le
				domaine informatique. Grâce à lui, j'ai pu effectuer mon second stage à l'École supérieure, puis travailler sur
				mon <Highlight color="violet.300" :rotation="1">projet de diplôme</Highlight> à la
				<a href="https://fivb.com" target="_blank" rel="nofollow">FIVB</a> (Fédération Internationale de Volleyball). À
				l'issue de cette expérience, la FIVB m'a proposé un poste permanent, et je travaille toujours au sein de cette
				organisation, presque dix ans après.
			</p>

			<h3 id="mon-environnement">
				<a href="#mon-environnement">Mon environnement</a>
			</h3>

			<p>
				Dans mon quotidien, j'utilise principalement
				<Highlight color="cyan.300" :rotation="-1"
					><a href="https://www.jetbrains.com/webstorm" target="_blank" rel="nofollow">JetBrains WebStorm</a></Highlight
				>, un IDE que je considère comme l'un des plus complets et puissants pour le développement JavaScript,
				TypeScript et Node.js. Pour des tâches plus légères ou des projets rapides, je me tourne également vers
				<Highlight color="gray.300" :rotation="1"
					><a href="https://zed.dev" target="_blank" rel="nofollow">Zed</a></Highlight
				>, un éditeur de texte minimaliste mais efficace, parfait pour ouvrir rapidement un fichier ou un petit projet
				sans perdre de temps.
			</p>

			<p>
				Je travaille principalement sur macOS avec un
				<Highlight color="red.300" :rotation="-1">MacBook Pro M1</Highlight>, qui m'offre une excellente performance
				pour mes projets professionnels. Pour mes projets personnels, je préfère utiliser ma tour gaming sous Linux,
				plus précisément
				<Highlight color="cyan.300" :rotation="1"
					><a href="https://zorin.com/os" target="_blank" rel="nofollow">Zorin OS</a></Highlight
				>.
			</p>
		</div>
	</section>
</template>

<style module>
	.content {
		p > a {
			--at-apply: underline cursor-pointer;
		}
	}
</style>
