import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html',
  styleUrls: ['./viewblog.component.css']
})
export class ViewblogComponent implements OnInit {
  blog: any

  constructor() { }

  ngOnInit(): void {
    this.blog = history.state.data
  }

}
