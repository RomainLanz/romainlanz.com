import vine from '@vinejs/vine'

export const storePostValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(100),
    canonicalUrl: vine.string().normalizeUrl().optional(),
    content: vine.string().minLength(3),
  })
)
