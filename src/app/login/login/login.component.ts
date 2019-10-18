import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {EmailValidation, PasswordValidation, RepeatPasswordValidator} from '../../registration/registration/validators';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../data-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    const profile = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };
    if (!this.dataService.checkProfile(profile)) {
      this.form.setErrors({
        invalidCredentials: true,
      });
    } else {
      this.form.setErrors({
        invalidCredentials: false,
      });
      this.dataService.login(profile);
      this.router.navigate(['home']);
    }
  }

  closeLogin() {
    this.router.navigate(['home']);
  }

}
