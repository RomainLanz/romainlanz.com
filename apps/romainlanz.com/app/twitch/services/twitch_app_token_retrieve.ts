import env from '#start/env'
import vine from '@vinejs/vine'
import cache from '@adonisjs/cache/services/main'
import { Secret } from '@adonisjs/core/helpers'

export class TwitchAppTokenRetrieve {
  static validator = vine.compile(
    vine.object({
      access_token: vine.string(),
      expires_in: vine.number(),
      token_type: vine.string(),
    })
  )

  async get() {
    const token = await cache.use('memory').getOrSet(
      'twitch_app_token',
      async () => {
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
          method: 'POST',
          body: JSON.stringify({
            client_id: env.get('TWITCH_CLIENT_ID'),
            client_secret: env.get('TWITCH_CLIENT_SECRET'),
            grant_type: 'client_credentials',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const body = await response.json()
        const data = await TwitchAppTokenRetrieve.validator.validate(body)

        return data.access_token
      },
      {
        ttl: '50d',
      }
    )

    return new Secret(token)
  }
}
