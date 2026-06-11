export const tagColors = ['cyan', 'violet', 'red', 'yellow', 'lime'] as const;

export type TagColor = (typeof tagColors)[number];

export function isTagColor(value: string): value is TagColor {
	return tagColors.includes(value as TagColor);
}
