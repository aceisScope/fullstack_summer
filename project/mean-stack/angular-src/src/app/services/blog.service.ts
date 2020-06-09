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

  addNewBlog(blog, user) {
    const body = {
      userid: user.id,
      title: blog.title,
      tag: blog.title,
      content: blog.content
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('id_token')
      }),
    }
    return this.http.post('http://localhost:3000/users/blog', body, httpOptions)
  }
}
