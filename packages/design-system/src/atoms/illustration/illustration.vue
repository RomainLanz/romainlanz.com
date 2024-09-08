<script lang="ts">
	export const IllustrationName = [
		'productivity',
		'javascript',
		'database',
		'design-pattern',
		'vuejs',
		'react',
		'adonis',
		'nodejs',
		'all',
		'aim',
		'arrow-bounce',
		'shapes',
		'arrow',
		'switch',
		'selection',
		'file',
		'sparkles',
		'radar',
		'zigzag',
		'transform',
		'pill',
	] as const;

	export type IllustrationName = (typeof IllustrationName)[number];
</script>

<script lang="ts" setup>
	defineProps<{
		name: IllustrationName;
	}>();
</script>

<template>
	<svg
		v-if="name === 'productivity'"
		width="96"
		height="96"
		viewBox="0 0 96 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M93.1724 48C93.1724 22.774 72.7261 2.3277 47.5001 2.3277C35.7209 2.3277 24.9773 6.78872 16.8784 14.1122"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M1.82764 48C1.82764 73.226 22.274 93.6723 47.5 93.6723C59.2792 93.6723 70.0228 89.2113 78.1217 81.8878"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path d="M70.9999 64.4048V38.0211H55.2695V64.4048" fill="#BFE3F8" />
		<path
			d="M70.9999 64.4048V38.0211H55.2695V64.4048"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path d="M55.2536 64.4049V22.158H39.5232V64.4049" fill="#DEC6FF" />
		<path
			d="M55.2536 64.4049V22.158H39.5232V64.4049"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path d="M39.5072 64.4048V49.9968H23.7769V64.4048" fill="#F8BFBF" />
		<path
			d="M39.5072 64.4048V49.9968H23.7769V64.4048"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M16.9048 21.834C21.0668 21.834 24.4408 18.4601 24.4408 14.2981C24.4408 10.1361 21.0668 6.76215 16.9048 6.76215C12.7428 6.76215 9.3689 10.1361 9.3689 14.2981C9.3689 18.4601 12.7428 21.834 16.9048 21.834Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M78.0953 89.2379C82.2572 89.2379 85.6312 85.8639 85.6312 81.7019C85.6312 77.54 82.2572 74.166 78.0953 74.166C73.9333 74.166 70.5593 77.54 70.5593 81.7019C70.5593 85.8639 73.9333 89.2379 78.0953 89.2379Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'javascript'"
		width="99"
		height="96"
		viewBox="0 0 99 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M49.2473 90.3086C35.2744 96.977 18.0796 93.0978 8.45087 80.2257C-2.52435 65.5636 0.467919 44.7726 15.1354 33.7974C15.5682 33.4715 16.001 33.1616 16.4445 32.8677C16.2682 35.021 16.3109 37.2172 16.5727 39.44C17.7483 49.2771 23.113 57.5913 30.6792 62.8117C31.4967 74.3053 38.2934 84.9813 49.2473 90.3086Z"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M49.5411 30.5326C42.4985 33.8722 36.5942 39.7018 33.2813 47.4282C31.1279 52.451 30.3157 57.7142 30.6791 62.8117C23.1129 57.5966 17.7482 49.277 16.5727 39.4399C16.3055 37.2118 16.2681 35.0157 16.4444 32.8676C26.5327 26.0335 39.1803 25.4938 49.5411 30.5326Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M82.5949 33.1669C80.8155 31.9432 78.8973 30.8799 76.8347 29.9983C67.7244 26.0976 57.8392 26.5892 49.541 30.5326C39.1802 25.4938 26.5326 26.0389 16.4443 32.8676C17.6519 17.4307 29.605 4.47849 45.5709 2.57091C63.7596 0.396176 80.2652 13.3858 82.4399 31.5692C82.504 32.1035 82.5575 32.6379 82.5895 33.1669H82.5949Z"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M68.0664 63.0041C63.8345 65.8681 58.8705 67.7917 53.4417 68.4383C45.0901 69.4375 37.0911 67.236 30.6791 62.8064C30.3157 57.7035 31.1279 52.4457 33.2813 47.4229C36.5942 39.6965 42.4932 33.8669 49.5411 30.5273C54.1417 32.7661 58.2881 36.1057 61.5582 40.4766C66.6023 47.2092 68.6969 55.2295 68.0664 63.0041Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M68.0664 63.0041C68.6969 55.2295 66.6023 47.2145 61.5582 40.4766C58.2827 36.1057 54.1416 32.7661 49.541 30.5273C57.8392 26.5839 67.7244 26.0976 76.8348 29.9929C78.8973 30.8746 80.8156 31.9432 82.5949 33.1615C83.4659 45.3176 77.6149 56.544 68.0664 62.9987V63.0041Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M68.0665 63.0041C67.3292 72.1625 62.8087 80.9684 54.8792 86.9048C53.0838 88.246 51.1976 89.3841 49.2473 90.3085C38.2881 84.9812 31.4967 74.3052 30.6792 62.8117C37.0965 67.236 45.0902 69.4374 53.4418 68.4436C58.8653 67.7917 63.8346 65.8734 68.0665 63.0094V63.0041Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M94.2593 73.5465C87.0512 90.3833 67.548 98.19 50.7111 90.9764C50.2142 90.7627 49.728 90.5383 49.2471 90.3085C51.1974 89.3841 53.0836 88.246 54.8789 86.9048C62.8138 80.9684 67.3289 72.1626 68.0663 63.0041C77.6148 56.5493 83.4658 45.323 82.5948 33.1669C95.3547 41.9406 100.591 58.7722 94.2593 73.5465Z"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'database'"
		width="71"
		height="96"
		viewBox="0 0 71 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M69.2272 44.4883V59.5956C69.2272 66.2543 54.115 71.6532 35.4716 71.6532C16.8282 71.6532 1.71606 66.2543 1.71606 59.5956V44.4883C1.71606 46.7208 3.40871 48.8074 6.36597 50.5974C12.2367 54.1577 23.0735 56.5459 35.4716 56.5459C47.8697 56.5459 58.7066 54.1577 64.5773 50.5974C67.5297 48.8074 69.2272 46.7208 69.2272 44.4883Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M69.2272 29.3809V44.4882C69.2272 51.1469 54.115 56.5459 35.4716 56.5459C16.8282 56.5459 1.71606 51.1469 1.71606 44.4882V29.3809C1.71606 31.6135 3.40871 33.7001 6.36597 35.49C12.2367 39.0504 23.0735 41.4386 35.4716 41.4386C47.8697 41.4386 58.7066 39.0504 64.5773 35.49C67.5297 33.7001 69.2272 31.6135 69.2272 29.3809Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M69.2272 14.2736C69.2272 16.5062 67.5346 18.5928 64.5773 20.3827C58.7066 23.9431 47.8697 26.3313 35.4716 26.3313C23.0735 26.3313 12.2367 23.9431 6.36597 20.3827C3.41357 18.5928 1.71606 16.5062 1.71606 14.2736C1.71606 7.61495 16.8282 2.216 35.4716 2.216C54.115 2.216 69.2272 7.61495 69.2272 14.2736Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M69.2272 14.2736V29.3809C69.2272 36.0396 54.115 41.4386 35.4716 41.4386C16.8282 41.4386 1.71606 36.0396 1.71606 29.3809V14.2736C1.71606 16.5062 3.40871 18.5928 6.36597 20.3827C12.2367 23.9431 23.0735 26.3313 35.4716 26.3313C47.8697 26.3313 58.7066 23.9431 64.5773 20.3827C67.5297 18.5928 69.2272 16.5062 69.2272 14.2736Z"
			fill="#DEC6FF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M1.71606 88.4337H69.2272M35.4716 88.4337V26.3264"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M35.2771 93.784C38.232 93.784 40.6274 91.3886 40.6274 88.4337C40.6274 85.4788 38.232 83.0834 35.2771 83.0834C32.3222 83.0834 29.9268 85.4788 29.9268 88.4337C29.9268 91.3886 32.3222 93.784 35.2771 93.784Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'design-pattern'"
		width="108"
		height="96"
		viewBox="0 0 108 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M74.4859 48.2269L56.7249 30.4659L38.9638 48.2269L56.7249 65.9879L74.4859 48.2269Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path d="M56.719 30.4679V17.245" stroke="#1E293B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
		<path
			d="M74.5054 48.2544H95.4005C97.4457 48.2544 99.1094 49.913 99.1094 51.9633V65.7713"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M41.1455 87.165H32.0335M19.7315 87.165H18.4748C16.1548 87.165 14.2673 85.2774 14.2673 82.9574V81.7211M14.2622 69.414V60.302"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M38.8662 9.5473H17.9711C15.9259 9.5473 14.2622 11.2059 14.2622 13.2562V38.3945"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M56.719 78.9891V65.7662"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M75.1872 2.27191H38.2557C34.1898 2.27191 30.8938 5.5668 30.8938 9.63124C30.8938 13.6957 34.1898 16.9906 38.2557 16.9906H75.1872C79.253 16.9906 82.549 13.6957 82.549 9.63124C82.549 5.5668 79.253 2.27191 75.1872 2.27191Z"
			fill="#DEC6FF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M65.5765 79.0043H47.9986C43.9327 79.0043 40.6367 82.2992 40.6367 86.3637C40.6367 90.4281 43.9327 93.723 47.9986 93.723H65.5765C69.6424 93.723 72.9384 90.4281 72.9384 86.3637C72.9384 82.2992 69.6424 79.0043 65.5765 79.0043Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M91.6764 73.1459C91.6764 77.2103 94.9712 80.5052 99.0357 80.5052C103.1 80.5052 106.395 77.2103 106.395 73.1459C106.395 69.0814 103.1 65.7865 99.0357 65.7865C94.9712 65.7865 91.6764 69.0814 91.6764 73.1459Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M14.3358 60.7854C21.2719 60.7854 26.8948 55.1625 26.8948 48.2264C26.8948 41.2903 21.2719 35.6675 14.3358 35.6675C7.39972 35.6675 1.77689 41.2903 1.77689 48.2264C1.77689 55.1625 7.39972 60.7854 14.3358 60.7854Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'vuejs'"
		width="105"
		height="96"
		viewBox="0 0 105 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M42.219 32.7281C42.219 15.98 55.7959 2.40314 72.5439 2.40314C89.292 2.40314 102.869 15.98 102.869 32.7281C102.869 49.4761 89.292 63.053 72.5439 63.053C67.0267 63.053 61.8519 61.5769 57.3955 59.0007L72.4373 32.947H42.2246C42.2246 32.874 42.2246 32.801 42.2246 32.7281H42.219Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M42.2246 32.947H72.4373L57.3955 59.0007C48.3816 53.7978 42.2976 44.0824 42.2246 32.947Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M2.40308 32.947H42.2245C42.2975 44.0824 48.3816 53.7922 57.3954 59.0007L37.4202 93.5968L2.40308 32.947Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'react'"
		width="85"
		height="96"
		viewBox="0 0 85 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M34.8951 61.2069C37.4501 62.6808 39.9901 64.0443 42.5001 65.2926C23.5751 74.6871 6.69511 77.3089 2.98011 70.8721C0.165106 65.9844 5.65511 57.1163 16.1501 47.9975C21.3151 52.4842 27.6901 57.0361 34.8951 61.2069Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M68.85 48.0025C63.685 43.5158 57.31 38.969 50.105 34.7981C47.55 33.3192 45.01 31.9507 42.5 30.7124C61.425 21.313 78.305 18.6861 82.02 25.1279C84.835 30.0156 79.345 38.8837 68.85 48.0025Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M68.8499 48.0025C63.6849 52.4892 57.3099 57.0411 50.1049 61.212C47.5499 62.6858 45.0099 64.0493 42.4999 65.2976C39.9949 64.0493 37.4499 62.6858 34.8949 61.212C27.6899 57.0411 21.3149 52.4892 16.1499 48.0025C21.3149 43.5158 27.6899 38.969 34.8949 34.7981C37.4499 33.3193 39.9899 31.9507 42.4999 30.7125C45.0099 31.9557 47.5499 33.3193 50.1049 34.7981C57.3099 38.969 63.6849 43.5108 68.8499 48.0025Z"
			fill="#DEC6FF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M42.4999 30.7074C39.9949 31.9507 37.4499 33.3142 34.8949 34.7931C27.6899 38.964 21.3149 43.5058 16.1499 47.9975C5.65989 38.8787 0.169889 30.0106 2.97989 25.1229C6.68989 18.6861 23.5749 21.3079 42.4999 30.7074Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M82.02 70.8771C78.31 77.3139 61.425 74.6921 42.5 65.2976C45.01 64.0493 47.55 62.6858 50.105 61.2119C57.31 57.0411 63.685 52.4892 68.85 48.0025C79.345 57.1263 84.835 65.9894 82.02 70.8771Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M42.5 93.7518C50.9003 93.7518 57.71 73.2691 57.71 48.0025C57.71 22.7359 50.9003 2.2533 42.5 2.2533C34.0998 2.2533 27.29 22.7359 27.29 48.0025C27.29 73.2691 34.0998 93.7518 42.5 93.7518Z"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'adonis'"
		width="110"
		height="96"
		viewBox="0 0 110 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.9099 93.5255L19.3454 78.9045L26.8879 65.8519L46.5902 31.7283L55.0315 46.3493L43.7705 65.8519L36.2339 78.9045H107.618L99.1766 93.5314H10.9099V93.5255Z"
			fill="#DEC6FF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M2.46851 78.9045L10.0052 65.8519L38.1488 17.1072L46.596 2.46857L63.4786 31.7107L83.1927 65.8519H66.2865L55.0314 46.3493L46.5901 31.7283L26.8878 65.8519L19.3453 78.9045L10.9098 93.5256L2.46851 78.9045Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M83.1928 65.8519L63.4787 31.7107L46.5961 2.46857H46.602H63.4846L71.9259 17.0837L100.081 65.8519L107.618 78.9045H36.2339L43.7706 65.8519H83.1928Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M43.7705 65.8519L55.0315 46.3493L66.2866 65.8519H43.7705Z"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'nodejs'"
		width="82"
		height="94"
		viewBox="0 0 82 94"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M29.5117 64.5939L40.7727 45.0914L52.0278 64.5939H29.5117Z"
			fill="#DEC6FF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M41.2413 47.2421V92.4841L2 69.8631L41.2413 47.2421Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M80.4825 69.8631L41.2412 92.4841V47.2421L80.4825 69.8631Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M80.4825 24.621V69.8631L41.2412 47.2421L80.4825 24.621Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M80.4825 24.621L41.2412 47.242V2L80.4825 24.621Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M41.2413 2V47.242L2 24.621L41.2413 2Z"
			fill="#DEC6FF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M41.2413 47.2421L2 69.8631V24.621L41.2413 47.2421Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'all'"
		width="82"
		height="94"
		viewBox="0 0 82 94"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M34.358 78.8419C52.2288 78.8419 66.716 64.3547 66.716 46.4839C66.716 28.6131 52.2288 14.1259 34.358 14.1259C16.4872 14.1259 2 28.6131 2 46.4839C2 64.3547 16.4872 78.8419 34.358 78.8419Z"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M66.7159 58.7459C74.0524 58.7459 79.9997 52.7985 79.9997 45.4621C79.9997 38.1256 74.0524 32.1783 66.7159 32.1783C59.3795 32.1783 53.4321 38.1256 53.4321 45.4621C53.4321 52.7985 59.3795 58.7459 66.7159 58.7459Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M17.3275 32.5189C24.664 32.5189 30.6113 26.5715 30.6113 19.2351C30.6113 11.8987 24.664 5.95129 17.3275 5.95129C9.99107 5.95129 4.0437 11.8987 4.0437 19.2351C4.0437 26.5715 9.99107 32.5189 17.3275 32.5189Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M19.0306 88.7196C26.3671 88.7196 32.3144 82.7722 32.3144 75.4358C32.3144 68.0993 26.3671 62.152 19.0306 62.152C11.6942 62.152 5.74683 68.0993 5.74683 75.4358C5.74683 82.7722 11.6942 88.7196 19.0306 88.7196Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'aim'"
		width="92"
		height="92"
		viewBox="0 0 92 92"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M40.6314 89.692C61.967 89.692 79.2629 72.3961 79.2629 51.0606C79.2629 29.725 61.967 12.4291 40.6314 12.4291C19.2959 12.4291 2 29.725 2 51.0606C2 72.3961 19.2959 89.692 40.6314 89.692Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M40.6315 76.9319C54.9199 76.9319 66.5028 65.3489 66.5028 51.0606C66.5028 36.7723 54.9199 25.1893 40.6315 25.1893C26.3432 25.1893 14.7603 36.7723 14.7603 51.0606C14.7603 65.3489 26.3432 76.9319 40.6315 76.9319Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M40.6315 64.1665C47.8697 64.1665 53.7374 58.2988 53.7374 51.0607C53.7374 43.8225 47.8697 37.9548 40.6315 37.9548C33.3933 37.9548 27.5256 43.8225 27.5256 51.0607C27.5256 58.2988 33.3933 64.1665 40.6315 64.1665Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M40.6315 51.4011C40.8195 51.4011 40.972 51.2487 40.972 51.0606C40.972 50.8726 40.8195 50.7202 40.6315 50.7202C40.4435 50.7202 40.291 50.8726 40.291 51.0606C40.291 51.2487 40.4435 51.4011 40.6315 51.4011Z"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M40.5947 51.0239L76.6804 14.9382"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path d="M75.24 16.6354H82.1387L89.6973 9.07676H82.7044L82.6206 8.99818V2L75.0671 9.55867V16.4626" fill="#FFFDF7" />
		<path
			d="M75.24 16.6354H82.1387L89.6973 9.07676H82.7044L82.6206 8.99818V2L75.0671 9.55867V16.4626"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'arrow-bounce'"
		width="100"
		height="85"
		viewBox="0 0 100 85"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M42.293 73.7628C72.8158 73.7628 97.5556 64.1456 97.5556 52.2864C97.5556 46.7444 92.1551 41.6948 83.2816 37.8814M83.2816 37.8814C73.172 42.2238 58.5523 44.9529 42.293 44.9529H42.5549C19.9889 44.9529 1.69727 42.8577 1.69727 37.8814C1.69727 33.429 19.9889 30.8099 42.5549 30.8099H42.293C58.5523 30.8099 73.172 33.539 83.2816 37.8814ZM83.2816 37.8814C92.1551 34.068 97.5556 29.0184 97.5556 23.4765C97.5556 11.6173 72.8158 2 42.293 2"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M42.293 2H42.555C31.6281 2 21.7018 2.61286 14.3684 3.75478"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M50.4122 82.8667C50.4122 77.9481 46.426 73.9619 41.5073 73.9619"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M50.4122 65.0518C50.4122 69.9704 46.426 73.9566 41.5073 73.9566"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'shapes'"
		width="145"
		height="42"
		viewBox="0 0 145 42"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M35.0537 2.5238H5.24857C3.20903 2.5238 1.55566 4.17717 1.55566 6.21671V36.0219C1.55566 38.0614 3.20903 39.7148 5.24857 39.7148H35.0537C37.0932 39.7148 38.7466 38.0614 38.7466 36.0219V6.21671C38.7466 4.17717 37.0932 2.5238 35.0537 2.5238Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M71.747 39.7148C82.1617 39.7148 90.6044 31.272 90.6044 20.8574C90.6044 10.4427 82.1617 2 71.747 2C61.3324 2 52.8896 10.4427 52.8896 20.8574C52.8896 31.272 61.3324 39.7148 71.747 39.7148Z"
			fill="#F8BFBF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M120.986 2L99.2107 39.7148H142.761L120.986 2Z"
			fill="#F8EAC7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'arrow'"
		width="109"
		height="50"
		viewBox="0 0 109 50"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M2 24.6091H106.763" stroke="#1E293B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
		<path
			d="M83.9773 1.69208C83.9773 14.2741 94.1812 24.4781 106.763 24.4781"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M83.9773 47.526C83.9773 34.9439 94.1812 24.74 106.763 24.74"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'switch'"
		width="77"
		height="40"
		viewBox="0 0 77 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M56.8058 1.69208H19.9658C9.91277 1.69208 1.76318 9.84167 1.76318 19.8947C1.76318 29.9477 9.91277 38.0973 19.9658 38.0973H56.8058C66.8588 38.0973 75.0084 29.9477 75.0084 19.8947C75.0084 9.84167 66.8588 1.69208 56.8058 1.69208Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M38.1684 19.8947C38.1684 9.84167 30.0188 1.69208 19.9658 1.69208C9.91277 1.69208 1.76318 9.84167 1.76318 19.8947C1.76318 29.9477 9.91277 38.0973 19.9658 38.0973C30.0188 38.0973 38.1684 29.9477 38.1684 19.8947Z"
			fill="#DEC6FF"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'selection'"
		width="94"
		height="93"
		viewBox="0 0 94 93"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M83.2001 10.0731H10.3896V82.8836H83.2001V10.0731Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M83.4619 17.9304C87.946 17.9304 91.5811 14.2953 91.5811 9.81123C91.5811 5.32715 87.946 1.69208 83.4619 1.69208C78.9778 1.69208 75.3428 5.32715 75.3428 9.81123C75.3428 14.2953 78.9778 17.9304 83.4619 17.9304Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M83.4619 90.7409C87.946 90.7409 91.5811 87.1058 91.5811 82.6217C91.5811 78.1376 87.946 74.5026 83.4619 74.5026C78.9778 74.5026 75.3428 78.1376 75.3428 82.6217C75.3428 87.1058 78.9778 90.7409 83.4619 90.7409Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M10.1277 17.9304C14.6118 17.9304 18.2468 14.2953 18.2468 9.81123C18.2468 5.32715 14.6118 1.69208 10.1277 1.69208C5.64361 1.69208 2.00854 5.32715 2.00854 9.81123C2.00854 14.2953 5.64361 17.9304 10.1277 17.9304Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M46.7949 17.9304C51.279 17.9304 54.9141 14.2953 54.9141 9.81123C54.9141 5.32715 51.279 1.69208 46.7949 1.69208C42.3108 1.69208 38.6758 5.32715 38.6758 9.81123C38.6758 14.2953 42.3108 17.9304 46.7949 17.9304Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M46.7949 90.7409C51.279 90.7409 54.9141 87.1058 54.9141 82.6217C54.9141 78.1376 51.279 74.5026 46.7949 74.5026C42.3108 74.5026 38.6758 78.1376 38.6758 82.6217C38.6758 87.1058 42.3108 90.7409 46.7949 90.7409Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M10.3897 54.3356C14.8737 54.3356 18.5088 50.7005 18.5088 46.2164C18.5088 41.7324 14.8737 38.0973 10.3897 38.0973C5.90558 38.0973 2.27051 41.7324 2.27051 46.2164C2.27051 50.7005 5.90558 54.3356 10.3897 54.3356Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M83.2 54.3356C87.684 54.3356 91.3191 50.7005 91.3191 46.2164C91.3191 41.7324 87.684 38.0973 83.2 38.0973C78.7159 38.0973 75.0808 41.7324 75.0808 46.2164C75.0808 50.7005 78.7159 54.3356 83.2 54.3356Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M10.1277 90.7409C14.6118 90.7409 18.2468 87.1058 18.2468 82.6217C18.2468 78.1376 14.6118 74.5026 10.1277 74.5026C5.64361 74.5026 2.00854 78.1376 2.00854 82.6217C2.00854 87.1058 5.64361 90.7409 10.1277 90.7409Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M46.7949 55.3832V37.4478"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M37.8271 46.4155H55.7626"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'file'"
		width="56"
		height="72"
		viewBox="0 0 56 72"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M53.7008 20.539V53.8118H1.58105V3.26353C1.58105 2.39399 2.28821 1.69208 3.1525 1.69208H34.8539L53.7008 20.539Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M53.7008 20.539H36.4306C35.561 20.539 34.8591 19.8318 34.8591 18.9675V1.69208L53.706 20.539H53.7008Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M53.7007 20.539L34.8538 1.69208"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M53.7008 53.8118V68.7301C53.7008 69.5996 52.9936 70.3015 52.1293 70.3015H3.1525C2.28297 70.3015 1.58105 69.5943 1.58105 68.7301V53.8118H53.7008Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'sparkles'"
		width="57"
		height="65"
		viewBox="0 0 57 65"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M28.1116 62.6695V40.664"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M1.70605 47.4265L20.7625 36.4211"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M1.70605 16.9351L20.7625 27.9405"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M28.1116 1.69208V23.6976"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M54.5172 16.9351L35.4556 27.9405"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M54.5172 47.4265L35.4556 36.4211"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'radar'"
		width="126"
		height="131"
		viewBox="0 0 126 131"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_154_1541)">
			<path
				d="M63.002 126.425C97.2777 126.425 125.064 98.5012 125.064 64.0554C125.064 29.6095 97.2777 1.68561 63.002 1.68561C28.7262 1.68561 0.940186 29.6095 0.940186 64.0554C0.940186 98.5012 28.7262 126.425 63.002 126.425Z"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M63.0019 104.057C84.985 104.057 102.806 86.1476 102.806 64.0554C102.806 41.9632 84.985 24.054 63.0019 24.054C41.0188 24.054 23.198 41.9632 23.198 64.0554C23.198 86.1476 41.0188 104.057 63.0019 104.057Z"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M63.0019 81.6885C72.6923 81.6885 80.5479 73.7939 80.5479 64.0554C80.5479 54.3169 72.6923 46.4222 63.0019 46.4222C53.3115 46.4222 45.4558 54.3169 45.4558 64.0554C45.4558 73.7939 53.3115 81.6885 63.0019 81.6885Z"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M80.2208 73.197C83.2717 73.197 85.7449 70.7115 85.7449 67.6455C85.7449 64.5795 83.2717 62.0941 80.2208 62.0941C77.17 62.0941 74.6968 64.5795 74.6968 67.6455C74.6968 70.7115 77.17 73.197 80.2208 73.197Z"
				fill="#DEC6FF"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M32.9975 48.924C39.0992 48.924 44.0456 43.953 44.0456 37.821C44.0456 31.6891 39.0992 26.7181 32.9975 26.7181C26.8959 26.7181 21.9495 31.6891 21.9495 37.821C21.9495 43.953 26.8959 48.924 32.9975 48.924Z"
				fill="#F8BFBF"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M46.4298 129.796C49.4806 129.796 51.9538 127.311 51.9538 124.245C51.9538 121.179 49.4806 118.693 46.4298 118.693C43.379 118.693 40.9058 121.179 40.9058 124.245C40.9058 127.311 43.379 129.796 46.4298 129.796Z"
				fill="#F8EAC7"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_154_1541">
				<rect width="126" height="130" fill="white" transform="translate(0 0.740845)" />
			</clipPath>
		</defs>
	</svg>

	<svg
		v-else-if="name === 'zigzag'"
		width="92"
		height="137"
		viewBox="0 0 92 137"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_154_1533)">
			<path
				d="M1.60153 1.99451H90.0245C90.7928 1.99451 90.8477 3.13281 90.0844 3.20803L2.38478 11.8632C0.868159 12.0136 0.868159 14.23 2.38478 14.3805L89.6204 22.9905C91.137 23.1409 91.137 25.3574 89.6204 25.5078L2.38478 34.1228C0.868159 34.2733 0.868159 36.4897 2.38478 36.6401L89.6204 45.2501C91.137 45.4006 91.137 47.617 89.6204 47.7675L2.38478 56.3825C0.868159 56.5329 0.868159 58.7493 2.38478 58.8998L89.5905 67.5098C91.1071 67.6602 91.1071 69.8817 89.5905 70.0271L2.41471 78.587C0.898093 78.7374 0.898093 80.9538 2.41471 81.1043L89.6204 89.7143C91.137 89.8647 91.137 92.0812 89.6204 92.2316L2.38478 100.842C0.868159 100.992 0.868159 103.208 2.38478 103.359L89.6204 111.969C91.137 112.119 91.137 114.336 89.6204 114.486L2.38478 123.101C0.868159 123.252 0.868159 125.468 2.38478 125.619L90.0794 134.274C90.8427 134.349 90.7878 135.487 90.0195 135.487H1.60153"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_154_1533">
				<rect width="92" height="136" fill="white" transform="translate(0 0.740845)" />
			</clipPath>
		</defs>
	</svg>

	<svg
		v-else-if="name === 'transform'"
		width="91"
		height="90"
		viewBox="0 0 91 90"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M83.5283 7.1839H7.47168V82.8421H83.5283V7.1839Z"
			fill="#BFE3F8"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M89 1.74084H78.6038V12.0826H89V1.74084Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M89 77.399H78.6038V87.7408H89V77.399Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M12.3962 1.74084H2V12.0826H12.3962V1.74084Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M12.3962 77.399H2V87.7408H12.3962V77.399Z"
			fill="#FFFDF7"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path d="M45.5 54.2662V35.6292" stroke="#1E293B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
		<path
			d="M36.1326 44.9477H54.8677"
			stroke="#1E293B"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<svg
		v-else-if="name === 'pill'"
		width="69"
		height="153"
		viewBox="0 0 69 153"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_154_1183)">
			<path
				d="M51.8719 76.4604V124.136C51.8719 128.937 49.9277 133.284 46.7845 136.43C43.6412 139.577 39.299 141.523 34.5029 141.523C24.9106 141.523 17.1338 133.738 17.1338 124.136V76.4604"
				fill="#BFE3F8"
			/>
			<path
				d="M51.8719 76.4604V124.136C51.8719 128.937 49.9277 133.284 46.7845 136.43C43.6412 139.577 39.299 141.523 34.5029 141.523C24.9106 141.523 17.1338 133.738 17.1338 124.136V76.4604"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M17.1338 76.4604V28.7851C17.1338 19.1827 24.9106 11.3976 34.5029 11.3976C44.0951 11.3976 51.8719 19.1827 51.8719 28.7851V76.4604"
				fill="#F8BFBF"
			/>
			<path
				d="M17.1338 76.4604V28.7851C17.1338 19.1827 24.9106 11.3976 34.5029 11.3976C44.0951 11.3976 51.8719 19.1827 51.8719 28.7851V76.4604"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M29.4377 2.14307C50.5159 2.14307 67.5992 8.78956 67.5992 16.9897C67.5992 20.8206 63.8676 24.3093 57.7436 26.9454C50.7624 29.9462 40.6659 31.8363 29.4377 31.8363H29.617C14.0352 31.8363 1.40063 30.0247 1.40063 26.9454C1.40063 23.5072 14.0352 22.0545 29.617 22.0545"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M29.4377 22.0601C50.5159 22.0601 67.5992 28.7066 67.5992 36.9068C67.5992 40.7376 63.8676 44.2263 57.7436 46.8625C50.7624 49.8632 40.6659 51.7534 29.4377 51.7534H29.617C14.0352 51.7534 1.40063 49.9417 1.40063 46.8625C1.40063 43.4243 14.0352 41.9716 29.617 41.9716"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M29.4377 41.9772C50.5159 41.9772 67.5992 48.6237 67.5992 56.8238C67.5992 60.6547 63.8676 64.1434 57.7436 66.7795C50.7624 69.7803 40.6659 71.6705 29.4377 71.6705H29.617C14.0352 71.6705 1.40063 69.8588 1.40063 66.7795C1.40063 63.3413 14.0352 61.8886 29.617 61.8886"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M29.4377 61.8942C50.5159 61.8942 67.5992 68.5407 67.5992 76.7409C67.5992 80.5717 63.8676 84.0604 57.7436 86.6966C50.7624 89.6973 40.6659 91.5875 29.4377 91.5875H29.617C14.0352 91.5875 1.40063 89.7759 1.40063 86.6966C1.40063 83.2584 14.0352 81.8057 29.617 81.8057"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M29.4377 81.8113C50.5159 81.8113 67.5992 88.4578 67.5992 96.6579C67.5992 100.489 63.8676 103.977 57.7436 106.614C50.7624 109.614 40.6659 111.505 29.4377 111.505H29.617C14.0352 111.505 1.40063 109.693 1.40063 106.614C1.40063 103.175 14.0352 101.723 29.617 101.723"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M29.4377 101.728C50.5159 101.728 67.5992 108.375 67.5992 116.575C67.5992 120.406 63.8676 123.894 57.7436 126.531C50.7624 129.531 40.6659 131.422 29.4377 131.422H29.617C14.0352 131.422 1.40063 129.61 1.40063 126.531C1.40063 123.092 14.0352 121.64 29.617 121.64"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M29.4377 121.645C50.5159 121.645 67.5993 128.292 67.5993 136.492C67.5993 140.323 63.8677 143.812 57.7437 146.448C50.7625 149.448 40.666 151.339 29.4377 151.339H29.617"
				stroke="#1E293B"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_154_1183">
				<rect width="69" height="152" fill="white" transform="translate(0 0.740845)" />
			</clipPath>
		</defs>
	</svg>
</template>
