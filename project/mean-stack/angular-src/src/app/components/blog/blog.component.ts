import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: any

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    const user =  JSON.parse(localStorage.getItem('user'))
    this.blogService.getBlogs(user).subscribe(data => {
      this.blogs = (data as any).blogs
    }, err => {
      console.log(err)
      return false
    })
  }

}
