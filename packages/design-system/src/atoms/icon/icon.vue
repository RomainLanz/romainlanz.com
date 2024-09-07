<script lang="ts">
	export const IconName = [
		'close',
		'close-large',
		'danger',
		'info',
		'success',
		'success-circle',
		'clipboard',
		'dropdown',
		'chevron-right',
		'search',
		'user',
		'link',
		'filter',
		'post',
		'video',
	] as const;

	export type IconName = (typeof IconName)[number];
</script>

<script lang="ts" setup>
	defineProps<{
		name: IconName;
	}>();
</script>

<template>
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<use :href="`#${name}`" />

		<symbol id="close">
			<path d="M14 6L6 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<path d="M6 6L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		</symbol>

		<symbol id="close-large">
			<path d="M16 4L4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<path d="M4 4L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		</symbol>

		<symbol id="danger">
			<path
				d="M9.13176 3.51942C9.51565 2.84761 10.4843 2.84761 10.8682 3.51943L17.1451 14.5039C17.526 15.1705 17.0446 16 16.2768 16H3.72318C2.95536 16 2.47399 15.1705 2.85494 14.5039L9.13176 3.51942Z"
				stroke="currentColor"
				stroke-width="2"
			/>
			<path d="M10 8L10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<circle cx="10" cy="13" r="1" fill="currentColor" />
		</symbol>

		<symbol id="info">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M10 13L10 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				<circle cx="10" cy="8" r="1" transform="rotate(-180 10 8)" fill="currentColor" />
				<ellipse cx="10" cy="10" rx="7" ry="7" transform="rotate(-180 10 10)" stroke="currentColor" stroke-width="2" />
			</svg>
		</symbol>

		<symbol id="success">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M13 7L9.66667 13L7 11"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</symbol>

		<symbol id="success-circle">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12.5 8L10 12.5L8 11"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<ellipse cx="10" cy="10" rx="7" ry="7" transform="rotate(-180 10 10)" stroke="currentColor" stroke-width="2" />
			</svg>
		</symbol>

		<symbol id="clipboard">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="2" y="6" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				<path d="M6 2H16C17.1046 2 18 2.89543 18 4V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</symbol>

		<symbol id="dropdown">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M15 8L10 13L5 8"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</symbol>

		<symbol id="chevron-right">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M8 6L12 10L8 14"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</symbol>

		<symbol id="search">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12.8284 12.8284L16.8284 16.8284"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<ellipse
					cx="8.5"
					cy="8.5"
					rx="5.5"
					ry="5.5"
					transform="rotate(-180 8.5 8.5)"
					stroke="currentColor"
					stroke-width="2"
				/>
			</svg>
		</symbol>

		<symbol id="user">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<ellipse cx="10" cy="7" rx="3" ry="3" transform="rotate(-180 10 7)" stroke="currentColor" stroke-width="2" />
				<path
					d="M5 16C5 13.2386 7.23858 11 10 11C12.7614 11 15 13.2386 15 16"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</symbol>

		<symbol id="link">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M8.58588 11.4142L11.4143 8.58578"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M9.29285 5.05024C10.855 3.48814 13.3876 3.48814 14.9497 5.05024C16.5118 6.61234 16.5118 9.145 14.9497 10.7071"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M10.7071 14.9498C9.14505 16.5119 6.61239 16.5119 5.05029 14.9498C3.4882 13.3877 3.4882 10.855 5.05029 9.29291"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</symbol>

		<symbol id="filter">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line
					x1="5"
					y1="5"
					x2="15"
					y2="5"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<line
					x1="7"
					y1="9"
					x2="13"
					y2="9"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<line
					x1="9"
					y1="13"
					x2="11"
					y2="13"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</symbol>

		<symbol id="post">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 3C4 2.44772 4.44772 2 5 2L9.9 2C9.95523 2 10 2.04477 10 2.1V7C10 7.55228 10.4477 8 11 8H13H15.9C15.9552 8 16 8.04477 16 8.1V17C16 17.5523 15.5523 18 15 18H5C4.44772 18 4 17.5523 4 17V3Z"
					stroke="currentColor"
					stroke-width="2"
				/>
				<path d="M8 14H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M16 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M8 11H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</symbol>

		<symbol id="video">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="3" y="6" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2" />
				<path d="M11 10L17 14L17 6L11 10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
			</svg>
		</symbol>
	</svg>
</template>
