import { AppUser } from '../models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  constructor(
    private db: AngularFireDatabase,) { }

  save(user: firebase.User, appUser: AppUser) {

    if (appUser.shipping === undefined) {
      appUser.shipping = {
        name: '',
        phoneNo: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      }
    }

    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      shipping: appUser.shipping
    });
  }

  updateShippingDetails(userId, shippingDetails) {
    this.db.object('/users/' + userId).update({
      shipping: shippingDetails
    });
  }

  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
