import { DomainEventHandler, DomainEvents } from '@core/domain-events';
import { EmailService } from '@modules/email/email.service';
import { UserCreatedDomainEvent } from '@modules/user/domain/events/user-created.domain-event';

export class OnUserCreatedDomainEvent implements DomainEventHandler {
  constructor(private readonly email: EmailService) {}

  public listen(): void {
    DomainEvents.subscribe(
      UserCreatedDomainEvent,
      this.onUserCreated.bind(this),
    );
  }

  async onUserCreated(event: UserCreatedDomainEvent): Promise<void> {
    await this.email.send(event.email, 'Welcome message goes here');
    /* Other side-effects can go here, or different event handlers can
    be created if needed */
  }
}
