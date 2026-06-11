<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Logo from '@rlanz/design-system/logo';
	import { client } from '~/client';

	const articleIndexUrl = client.urlFor('admin.articles.index');
	const redirectIndexUrl = client.urlFor('admin.redirects.index');
	const taxonomyIndexUrl = client.urlFor('admin.taxonomies.index');
</script>

<template>
	<div class="flex min-h-full">
		<div class="flex flex-shrink-0">
			<div
				class="group/item relative flex w-72 flex-grow flex-col border-0 border-r-2 border-solid border-gray-800 bg-white pt-5 pb-4 transition-all"
				:style="{ scrollbarGutter: 'stable' }"
			>
				<div class="sticky top-0">
					<Link href="/" class="my-10 ml-2 flex flex-shrink-0 items-center gap-2 px-4">
						<Logo />
						<span class="xs:block hidden text-xl font-bold text-gray-800">Romain Lanz</span>
					</Link>

					<div class="mt-5 flex flex-grow flex-col">
						<nav class="flex flex-1 flex-col justify-between gap-2 px-2" aria-label="Sidebar">
							<div class="space-y-2">
								<Link
									class="flex w-full items-center rounded-md py-2 pr-1 pl-2 text-gray-600 hover:bg-yellow-300 hover:text-yellow-900 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
									:href="articleIndexUrl"
								>
									Articles
								</Link>

								<Link
									class="flex w-full items-center rounded-md py-2 pr-1 pl-2 text-gray-600 hover:bg-yellow-300 hover:text-yellow-900 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
									:href="redirectIndexUrl"
								>
									Redirections
								</Link>

								<Link
									class="flex w-full items-center rounded-md py-2 pr-1 pl-2 text-gray-600 hover:bg-yellow-300 hover:text-yellow-900 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
									:href="taxonomyIndexUrl"
								>
									Taxonomies
								</Link>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>

		<!--		<ul class="m-0 list-none p-0"> -->
		<!--			<li class="rounded-md px-3 py-2 hover:bg-yellow-100"> -->
		<!--				<Link class="block" :href="articleIndexUrl">Articles</Link> -->
		<!--			</li> -->
		<!--		</ul> -->
	</div>
</template>
