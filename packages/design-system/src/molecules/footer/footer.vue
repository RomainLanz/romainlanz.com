<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Logo from '../../atoms/logo/logo.vue';
	import FooterSection from './footer_section.vue';
	import SocialNetwork from './social_network.vue';
	import { client } from '@rlanz/rpc/client';

	const contactUrl = client.$url('pages.contact');
	const aboutUrl = client.$url('pages.about');
</script>

<template>
	<footer class="bg-yellow-200 border-t-2 border-gray-800 text-sm mt-10 py-12 isolate">
		<div class="max-w-7xl px-4 m-auto">
			<div class="flex justify-between">
				<Link class="hidden sm:block" href="/">
					<Logo monochrome />
				</Link>

				<FooterSection title="Réseau&nbsp;sociaux">
					<ul class="flex flex-col gap-1 text-sm list-none pl-0">
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
					<ul class="flex flex-col gap-1 text-sm list-none pl-0">
						<li>
							<a href="https://plausible.romainlanz.com/romainlanz.com" rel="nofollow">Statistiques</a>
						</li>
						<li>
							<Link :href="contactUrl" prefetch>Contact</Link>
						</li>
						<li>
							<Link :href="aboutUrl" prefetch>À Propos</Link>
						</li>
					</ul>
				</FooterSection>

				<FooterSection title="Partenaires">
					<ul class="flex flex-col gap-1 text-sm list-none pl-0">
						<!--						<li>-->
						<!--							<a href="https://m.do.co/c/cc9e0b565057" rel="sponsored"> Hetzner </a>-->
						<!--						</li>-->
						<li>
							<a href="https://app.codecrafters.io/join?via=RomainLanz" rel="sponsored"> CodeCrafters </a>
						</li>
					</ul>
				</FooterSection>
			</div>

			<hr class="h-1px border-none bg-gray-800 my-12" />

			<section class="flex justify-between">
				<!--				<Link href="#">Mentions légales</Link>-->
				<span class="block">&copy; Romain Lanz</span>
			</section>
		</div>
	</footer>
</template>
