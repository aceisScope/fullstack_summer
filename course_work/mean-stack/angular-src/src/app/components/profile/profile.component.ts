import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(data => {
      console.log(data)
      const profile = data as any
      this.user = profile.user
    }, err => {
      console.log(err)
      return false
    })
  }

}
