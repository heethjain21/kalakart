import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ContactUsService {

  constructor(private db: AngularFireDatabase) { }

  addNewMessage(messageDetails) {
    return this.db.list('/contact-messages').push(messageDetails);
  } 

  getAllMessages() {
    return this.db.list('/contact-messages');
  }

}
