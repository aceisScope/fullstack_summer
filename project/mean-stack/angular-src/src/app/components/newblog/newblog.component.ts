import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service'
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

  constructor(private _flashMessagesService: FlashMessagesService, private router: Router, private validateService: ValidateService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const blog = {
      title: this.title,
      tag: this.tag,
      content: this.content
    }
    if (!this.validateService.validateBlog(blog)) {
      this._flashMessagesService.show('Please fill in all the fields of the blog', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    this.router.navigate(['/blog'])
  }
}
