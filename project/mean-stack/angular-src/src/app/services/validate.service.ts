import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined) {
      return false
    }
    return true
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateAvatarURL(avatar) {
    const re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
    return re.test(avatar)
  }

  validateBlog(blog) {
    if (blog.title == undefined || blog.content == undefined || blog.tag == undefined) {
      return false
    }
    return true
  }
}
