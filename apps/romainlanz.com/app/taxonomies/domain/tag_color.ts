import { isTagColor, type TagColor } from '@rlanz/design-system/tag-color';

export function parseTagColor(color: string): TagColor {
	if (!isTagColor(color)) {
		throw new Error(`Unsupported tag color "${color}"`);
	}

	return color;
}
