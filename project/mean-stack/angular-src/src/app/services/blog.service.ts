import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(user) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('id_token')
      }),
      params: {
        'userid': user.id
      }
    }
    return this.http.get('http://localhost:3000/users/blog',  httpOptions)
  }
}
