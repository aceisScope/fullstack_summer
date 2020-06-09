import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service'
import { BlogService } from '../../services/blog.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.css']
})
export class NewblogComponent implements OnInit {
  title: String
  tag: String
  content: String

  constructor(private _flashMessagesService: FlashMessagesService, 
    private router: Router, 
    private validateService: ValidateService,
    private blogService: BlogService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const blog = {
      title: this.title,
      tag: this.tag,
      content: this.content
    }
    const user =  JSON.parse(localStorage.getItem('user'))

    if (!this.validateService.validateBlog(blog)) {
      this._flashMessagesService.show('Please fill in all the fields of the blog', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }
    
    this.blogService.addNewBlog(blog, user).subscribe(data => {
      this._flashMessagesService.show('Successfully added a new blog', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/blog'])
    }, err => {
      console.log(err)
      return false
    })
  }
}
