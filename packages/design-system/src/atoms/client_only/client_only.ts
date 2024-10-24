import { computed, createCommentVNode, defineComponent, h, onMounted, ref } from 'vue';

export default defineComponent({
	props: {
		isShow: {
			type: Boolean,
			default: undefined,
		},
	},

	setup(props, { slots }) {
		const isMounted = ref(false);
		const isShowDefaultSlot = computed(() => {
			if (props.isShow === undefined) return isMounted.value;

			return props.isShow && isMounted.value;
		});

		onMounted(() => {
			isMounted.value = true;
		});

		const defaultVNode = slots.default
			? h(() => slots.default!())
			: createCommentVNode('Client only rendering with empty default slot');
		const placeholderVNode = slots.placeholder
			? h(() => slots.placeholder!())
			: createCommentVNode(`Client only rendering component placeholder`);

		return () => (isShowDefaultSlot.value ? defaultVNode : placeholderVNode);
	},
});
