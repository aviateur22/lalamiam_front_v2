import { Injectable } from '@angular/core';
import { IUser } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser | null = null;
  constructor() { }

  getUser():IUser | null {
    return this.user;
  }
}
