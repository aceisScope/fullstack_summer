import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  avatar: String

  constructor(private authService: AuthService, 
    private router: Router, 
    private _flashMessagesService: FlashMessagesService,
    private validateService: ValidateService) { }

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

  onAvatarSubmit() {
    if (!this.validateService.validateAvatarURL(this.avatar)) {
      this._flashMessagesService.show('Please fill in a valid image URL', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }
    
  }
}
