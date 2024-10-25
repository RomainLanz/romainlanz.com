import { ref } from 'vue';

const pageTitle = ref<string | null>();

export function usePageTitle(title?: string) {
	if (title) {
		pageTitle.value = title;
	}

	return pageTitle;
}
