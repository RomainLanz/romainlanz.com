<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Logo from '../../atoms/logo/logo.vue';
	import FooterSection from './footer_section.vue';
	import SocialNetwork from './social_network.vue';

	defineProps<{
		aboutHref: string;
		contactHref: string;
		homeHref: string;
	}>();
</script>

<template>
	<footer class="isolate mt-10 border-t-2 border-gray-800 bg-yellow-200 py-12 text-sm">
		<div class="m-auto max-w-7xl px-4">
			<div class="flex justify-between">
				<Link class="hidden sm:block" :href="homeHref">
					<Logo monochrome />
				</Link>

				<FooterSection title="Réseau&nbsp;sociaux">
					<ul class="flex list-none flex-col gap-1 pl-0 text-sm">
						<li>
							<SocialNetwork name="Discord" link="https://discord.gg/hcFa6Za6z8" />
						</li>
						<li>
							<SocialNetwork name="GitHub" link="https://github.com/RomainLanz" />
						</li>
						<li>
							<SocialNetwork name="Twitch" link="https://www.twitch.tv/romainlanz" />
						</li>
						<li>
							<SocialNetwork name="Bluesky" link="https://bsky.app/profile/romainlanz.com" />
						</li>
						<li>
							<SocialNetwork name="X (Twitter)" icon="x" link="https://x.com/romainlanz" />
						</li>
						<li>
							<SocialNetwork name="YouTube" link="https://www.youtube.com/c/RomainLanz" />
						</li>
					</ul>
				</FooterSection>

				<FooterSection title="Navigation">
					<ul class="flex list-none flex-col gap-1 pl-0 text-sm">
						<li>
							<a
								href="https://analytics.romainlanz.com/share/xbQs4BqwTC6h9mtK/romainlanz.com"
								rel="nofollow"
								target="_blank"
							>
								Statistiques
							</a>
						</li>
						<li>
							<Link :href="contactHref" prefetch>Contact</Link>
						</li>
						<li>
							<Link :href="aboutHref" prefetch>À Propos</Link>
						</li>
					</ul>
				</FooterSection>

				<FooterSection title="Partenaires">
					<ul class="flex list-none flex-col gap-1 pl-0 text-sm">
						<li>
							<a href="https://hetzner.cloud/?ref=Qkd3MiGZUIgB" rel="sponsored">Hetzner</a>
						</li>
						<li>
							<a href="https://app.codecrafters.io/join?via=RomainLanz" rel="sponsored">CodeCrafters</a>
						</li>
					</ul>
				</FooterSection>

				<!--				<FooterSection title="Newsletter"> -->
				<!--					<slot name="newsletter" /> -->
				<!--				</FooterSection> -->
			</div>

			<hr class="h-1px my-12 border-none bg-gray-800" />

			<section class="flex justify-between">
				<!--				<Link href="#">Mentions légales</Link> -->
				<span class="block">&copy; Romain Lanz</span>
			</section>
		</div>
	</footer>
</template>
