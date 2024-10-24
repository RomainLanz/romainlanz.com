import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

export function useCurrentUser() {
	return computed(() => usePage().props.currentUser);
}
