import type { Paste } from '#paste/domain/paste';

export type PasteViewModelSerialized = ReturnType<PasteViewModel['serialize']>;

export class PasteViewModel {
	constructor(private paste: Paste) {}

	static fromDomain(paste: Paste) {
		return new this(paste);
	}

	serialize() {
		return {
			paste: {
				id: this.paste.getIdentifier().toString(),
				content: this.paste.props.content,
			},
		};
	}
}
