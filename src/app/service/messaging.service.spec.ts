import { TestBed } from '@angular/core/testing';

import { MessagingService } from './messaging.service';
import {AngularFireMessagingModule} from "@angular/fire/compat/messaging";

describe('MessagingService', () => {
  let service: MessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireMessagingModule // Ensure AngularFireMessagingModule is imported
      ],
      providers: [
        MessagingService
        // Any other mock or stub providers needed
      ]
    });
    service = TestBed.inject(MessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
