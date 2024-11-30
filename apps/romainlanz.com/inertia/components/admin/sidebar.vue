<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import Logo from '@rlanz/design-system/logo';
	import { client } from '@rlanz/rpc/client';

	const articleIndexUrl = client.$url('admin.articles.index');
	const redirectIndexUrl = client.$url('admin.redirects.index');
</script>

<template>
	<div class="min-h-full flex">
		<div class="flex flex-shrink-0">
			<div
				class="group/item relative w-72 flex flex-grow flex-col border-0 border-r-2 border-gray-800 border-solid bg-white pb-4 pt-5 transition-all"
				:style="{ scrollbarGutter: 'stable' }"
			>
				<div class="sticky top-0">
					<Link href="/" class="my-10 ml-2 flex flex-shrink-0 items-center gap-2 px-4">
						<Logo />
						<span class="hidden text-xl text-gray-800 font-bold xs:block">Romain Lanz</span>
					</Link>

					<div class="mt-5 flex flex-grow flex-col">
						<nav class="flex flex-1 flex-col justify-between gap-2 px-2" aria-label="Sidebar">
							<div class="space-y-2">
								<Link
									class="w-full flex items-center rounded-md py-2 pl-2 pr-1 text-gray-600 hover:bg-yellow-300 hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
									:href="articleIndexUrl"
								>
									Articles
								</Link>

								<Link
									class="w-full flex items-center rounded-md py-2 pl-2 pr-1 text-gray-600 hover:bg-yellow-300 hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
									:href="redirectIndexUrl"
								>
									Redirections
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
