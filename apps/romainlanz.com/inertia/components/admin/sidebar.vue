<script lang="ts" setup>
	import { Link } from '@inertiajs/vue3';
	import { client } from '@rlanz/rpc/client';

	const articleIndexUrl = client.$url('admin.articles.index');
</script>

<template>
	<aside class="flex-basis-[300px] border-2 border-gray-800 rounded-lg border-solid bg-white p-6 shadow-small">
		<ul class="m-0 list-none p-0">
			<li class="rounded-md px-3 py-2 hover:bg-yellow-100">
				<Link class="block" :href="articleIndexUrl">Articles</Link>
			</li>
		</ul>
	</aside>
</template>
