import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../modules/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  user:User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    console.log(this.user)
  }
}
