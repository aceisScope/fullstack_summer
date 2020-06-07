import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: any

  constructor() { }

  ngOnInit(): void {
    this.blogs = [
      {
        "title": "One"
      },
      {
        "title": "Two"
      },
      {
        "title": "Three"
      }
    ]
  }

}
