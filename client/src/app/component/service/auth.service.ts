import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  // porque estamos em ng serve modo de client

  domain = 'http://localhost:8080';

  constructor(
    // chamar o http module no constructor

      private http: Http // nome da variavel
      // chama o modulo Http do import
      // tem de ser declarado no constuctor
  ) { }

  // função para registrar users
  registerUser(user) {

    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
     // recolhe os dados do utilizador do ficheiro autentication register do servidor Index.js

  }

  checkUsername (username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
   }

   checkEmail(email) {

    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
     // recolhe os dados do utilizador do ficheiro autentication register do servidor Index.js

  }
}
