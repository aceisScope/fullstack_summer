import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  updateAvatar(user, newAvatar) {
    const body = {
      username: user.username,
      avatar: newAvatar
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('id_token')
      })
    }

    return this.http.post('http://localhost:3000/users/updateAvatar', body, httpOptions)
  }
}
