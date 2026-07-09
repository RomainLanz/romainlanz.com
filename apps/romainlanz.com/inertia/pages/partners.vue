<script setup lang="ts">
	import { Head } from '@inertiajs/vue3';
	import Button from '@rlanz/design-system/button';
	import Highlight from '@rlanz/design-system/highlight';

	const partners = [
		{
			name: 'Proton AG',
			location: 'Genève, Suisse',
			color: 'violet',
			href: 'https://go.getproton.me/SH1vL',
			description:
				'Proton est une entreprise suisse fondée par des scientifiques du CERN, engagée pour la protection de la vie privée en ligne.',
			reasons: [
				'Leur mission est claire: proposer des alternatives sécurisées et respectueuses de vos données face aux géants du web.',
				'J’utilise personnellement leurs services depuis plusieurs années, et j’en suis vraiment satisfait.',
				'L’expérience est fluide, les applications sont bien pensées, et surtout: mes données restent mes données.',
			],
			offers: [
				{
					name: 'Proton VPN',
					description: 'Un VPN sécurisé, rapide et sans journaux.',
					discount: '64% de rabais',
					href: 'https://go.getproton.me/SH1uu',
				},
				{
					name: 'Proton Drive',
					description: 'Un espace de stockage chiffré dans le cloud.',
					discount: '40% de rabais',
					href: 'https://go.getproton.me/SH1us',
				},
				{
					name: 'Proton Pass',
					description: 'Un gestionnaire de mots de passe sécurisé avec création d’alias d’email.',
					discount: '50% de rabais',
					href: 'https://go.getproton.me/SH1ut',
				},
				{
					name: 'Proton Unlimited',
					description: 'L’offre complète avec tous les produits Proton.',
					discount: '23% de rabais',
					href: 'https://go.getproton.me/SH1vL',
				},
			],
		},
		{
			name: 'Infomaniak',
			location: 'Genève, Suisse',
			color: 'lime',
			href: 'https://www.infomaniak.com/goto/fr/home?utm_term=6a44107438c4d',
			description:
				'Infomaniak construit un cloud souverain suisse, éthique et indépendant, avec des services pour publier, collaborer et héberger ses projets.',
			reasons: [
				'Leur infrastructure, leurs équipes et leurs datacenters sont basés en Suisse, avec une vraie attention portée à la confidentialité et à la souveraineté numérique.',
				'Ils proposent une vraie offre de Cloud Public basée sur OpenStack, adaptée aux projets qui ont besoin d’une infrastructure sérieuse sans dépendre d’un cloud propriétaire.',
				'Chaque utilisateur peut recevoir CHF 300.- de crédits pour démarrer son premier Public Cloud, ce qui permet de tester sérieusement la plateforme.',
				'Leurs prix restent raisonnables, sans minimum, sans frais de mise en service et avec une facturation à l’usage, ce qui rend leur cloud accessible pour presque n’importe quel projet.',
				'J’aime soutenir des acteurs locaux qui gardent une vision éthique du cloud tout en proposant des outils solides aux développeurs, créateurs et entreprises.',
			],
			offers: [
				{
					name: 'Public Cloud',
					description: 'CHF 300.- de crédits offerts pour démarrer le premier Public Cloud de chaque utilisateur.',
					discount: 'CHF 300.- offerts',
					href: 'https://www.infomaniak.com/fr/hebergement/public-cloud?utm_term=6a44107438c4d',
				},
			],
		},
	] as const;
</script>

<template>
	<Head title="Partenaires" />

	<section class="mx-auto mt-24 max-w-[80ch] px-4">
		<h1 class="mb-8">Partenaires</h1>

		<div class="mx-auto max-w-[80ch] space-y-8 text-lg" :class="$style.content">
			<p>
				J’ai la chance d’avoir aujourd’hui
				<Highlight color="violet.300" :rotation="1">Proton AG</Highlight>
				et
				<Highlight color="lime.300" :rotation="-1">Infomaniak</Highlight>
				comme partenaires. Deux entreprises suisses, indépendantes, qui construisent des produits que je suis fier de
				mettre en avant ici.
			</p>

			<p>
				Je veux que cette page reste simple et transparente: ces liens peuvent soutenir mon travail, mais les
				partenaires listés ici sont avant tout des entreprises que j’ai choisies parce qu’elles ont du sens pour moi,
				pour ce site et pour les personnes qui me lisent.
			</p>
		</div>
	</section>

	<section class="mx-auto mt-16 max-w-5xl px-4">
		<div class="grid gap-6 lg:grid-cols-2">
			<article
				v-for="partner in partners"
				:key="partner.name"
				class="bg-off-white shadow-small flex flex-col gap-6 rounded-lg border-2 border-gray-800 p-6"
			>
				<header>
					<p class="mb-2 text-sm font-bold tracking-normal text-gray-600 uppercase">{{ partner.location }}</p>
					<h2 class="text-4xl">{{ partner.name }}</h2>
				</header>

				<p class="text-lg">{{ partner.description }}</p>

				<div>
					<h3 class="mb-3 text-2xl">Pourquoi ce partenaire ?</h3>
					<ul class="m-0 flex list-disc flex-col gap-3 pl-5 text-base">
						<li v-for="reason in partner.reasons" :key="reason">
							{{ reason }}
						</li>
					</ul>
				</div>

				<div v-if="'offers' in partner">
					<h3 class="mb-3 text-2xl">Offres disponibles</h3>
					<ul class="m-0 flex list-none flex-col gap-3 pl-0 text-base">
						<li
							v-for="offer in partner.offers"
							:key="offer.name"
							class="rounded-lg border-2 border-gray-800 bg-white p-4"
						>
							<div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
								<a class="font-bold underline" :href="offer.href" rel="sponsored" target="_blank">
									{{ offer.name }}
								</a>
								<span class="text-sm font-bold text-gray-600">{{ offer.discount }}</span>
							</div>
							<p class="mt-2 text-sm">{{ offer.description }}</p>
						</li>
					</ul>
				</div>

				<div class="mt-auto pt-2">
					<Button :color="partner.color" :href="partner.href" rel="sponsored" target="_blank">
						Découvrir {{ partner.name }}
					</Button>
				</div>
			</article>
		</div>

		<p class="mt-8 text-sm">
			Les liens présents sur cette page sont des liens affiliés ou trackés. En passant par eux, vous pouvez bénéficier
			d’un rabais et vous me permettez aussi de toucher une petite commission. Merci pour votre soutien.
		</p>
	</section>
</template>

<style module>
	.content {
		p > a {
			cursor: pointer;
			text-decoration-line: underline;
		}
	}
</style>
