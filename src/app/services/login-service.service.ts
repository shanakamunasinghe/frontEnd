import { Injectable } from '@angular/core';
import { Client } from './../models/client';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { }

  validateUser(email: string, password: string): Client {
    if(email == "sh" && password == "shehan") {
      let c: Client = new Client();
      c.id = 1;
      c.name = "Shehan";
      c.email = "quoteshehan@gmail.com";
      return c;
    }
    else
      return new Client();
  }
}
