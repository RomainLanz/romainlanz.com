import vine from '@vinejs/vine'

export const storeRedirectValidator = vine.compile(
  vine.object({
    url: vine.string().maxLength(150),
    to: vine.string().maxLength(150),
  })
)
