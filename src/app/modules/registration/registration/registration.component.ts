import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from 'src/app/data-service';
import {EmailValidation, PasswordValidation, RepeatPasswordEStateMatcher, RepeatPasswordValidator} from './validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  // profileForm = this.fb.group({
  //   name: ['',  Validators.required],
  //   // email: ['', [Validators.required, Validators.email]],
  //   email: new FormControl('', Validators.compose([
  //     Validators.required,
  //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //   ])),
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   passwordConfirm: ['', Validators.required],
  //   birthdate: [''],
  // });
  // tslint:disable-next-line:new-parens
  form = this.fb.group({
    name: ['',  Validators.required],
    email: new FormControl('', EmailValidation),
    password: new FormControl('', PasswordValidation),
    passwordAgain: new FormControl(''),
  }, {validator: RepeatPasswordValidator});

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dataService.saveProfile({
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    });
    this.router.navigate(['home']);
  }

  closeRegistration() {
    this.router.navigate(['home']);
  }
}
