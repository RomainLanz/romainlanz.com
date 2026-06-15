export declare const tagColors: readonly ['cyan', 'violet', 'red', 'yellow', 'lime'];

export type TagColor = (typeof tagColors)[number];

export declare function isTagColor(value: string): value is TagColor;
