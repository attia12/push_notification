import { Injectable } from '@angular/core';
import {BehaviorSubject, take} from 'rxjs';
import {AngularFireMessaging} from "@angular/fire/compat/messaging";


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (message) => {
        console.log("new message received. ", message);
        this.currentMessage.next(message);
      }
    );
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.pipe(take(1)).subscribe(
      (token) => {
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      });
  }
}
