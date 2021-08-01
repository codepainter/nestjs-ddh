import { DomainEventHandler } from '@core/domain-events';
import { EmailService } from '@modules/email/email.service';

import { OnUserCreatedDomainEvent } from './user-created.event-handler';

const domainEventHandlers: DomainEventHandler[] = [
  new OnUserCreatedDomainEvent(new EmailService()),
];

export function initDomainEventHandlers(): void {
  domainEventHandlers.forEach((eventHandler: DomainEventHandler) =>
    eventHandler.listen(),
  );
}
