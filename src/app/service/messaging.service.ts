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
        this.showCustomNotification(payload);
      });
  }
  showCustomNotification(payload:any)
  {
    let notify_data=payload['notification'];

    let title=notify_data['title'];
    let options= {
      body : notify_data['body'],
      icon:"./assets/image/logo.jpg",
      badge:"./assets/image/badge.png",
      image:"./assets/image/logo.jpg",
    };
    console.log("new message received",notify_data);
    let notify:Notification=new Notification(title,options)
    notify.onclick=event => {
      event.preventDefault();
      window.location.href='https://www.google.com';
    }
  }
}
