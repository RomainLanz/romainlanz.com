import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

export function usePageErrors() {
	return computed(() => usePage().props.errors || {});
}
