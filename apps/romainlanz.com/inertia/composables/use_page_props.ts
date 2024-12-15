import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

export function usePageProps() {
	const page = usePage();

	return computed(() => page.props);
}
