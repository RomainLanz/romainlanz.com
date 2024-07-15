import { BaseEvent } from '@adonisjs/core/events'
import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Providing the instance of emitter to the "BaseEvent" class,
   * so that you can emit events using the "Event.dispatch"
   * method.
   */
  protected async makeEventsDispatchable() {
    BaseEvent.useEmitter(await this.app.container.make('emitter'))
  }

  async boot() {
    await this.makeEventsDispatchable()
  }
}
