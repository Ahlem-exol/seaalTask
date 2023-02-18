import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from 'src/app/_modals/error-modal/error-modal.component';
import { SuccessModalComponent } from 'src/app/_modals/success-modal/success-modal.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  isLogin = true;
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void { }

  ngAfterViewInit() { }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (!this.isLogin) {
      const nom = form.value.nom;
      const prenom = form.value.prenom;
      this.authService.createUser(email, nom, prenom, password)
        .subscribe(result => {
          console.log(result)
          const modalRef = this.modalService.open(SuccessModalComponent);
          modalRef.componentInstance.message = result.message;
          this.isLogin = !this.isLogin;
          form.reset();
        }, error => {
          const modalRef = this.modalService.open(ErrorModalComponent);
          modalRef.componentInstance.message = error.message;
        });
    } else {
      this.authService.login(email, password);
      form.reset();
    }
  
  }
}
