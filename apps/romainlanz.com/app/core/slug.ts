import string from '@adonisjs/core/helpers/string';

export function generateSlug(value: string) {
	return string.slug(value, {
		lower: true,
		strict: true,
		trim: true,
	});
}
