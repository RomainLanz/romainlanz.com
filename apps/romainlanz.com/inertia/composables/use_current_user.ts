import { Data } from '@generated/data';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

export function useCurrentUser() {
	return computed(() => usePage<Data.SharedProps>().props.currentUser as Data.Auth.CurrentUser | undefined);
}
