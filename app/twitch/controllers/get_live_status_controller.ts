import { inject } from '@adonisjs/core'
import { Twitch } from '#twitch/services/twitch'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GetLiveStatusController {
  constructor(private twitch: Twitch) {}

  async execute({ response }: HttpContext) {
    const isLive = await this.twitch.getLiveStatus()

    return isLive
  }
}
