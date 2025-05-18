import { createToaster } from '@ark-ui/vue/toast';

export const toaster = createToaster({ placement: 'top-end', overlap: true, gap: 16, duration: 3_000_000 });
