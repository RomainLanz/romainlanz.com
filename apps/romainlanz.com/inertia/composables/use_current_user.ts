import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import type { CurrentUserViewModelSerialized } from '#auth/view_models/current_user_view_model';

export function useCurrentUser() {
	return computed(() => usePage().props.currentUser as CurrentUserViewModelSerialized);
}
