import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  profileForm = this.fb.group({
    name: ['',  Validators.required],
    // password: ['', Validators.required],
    // passwordConfirm: ['', Validators.required],
    password: [''],
    passwordConfirm: [''],
    birthdate: [''],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() { }

  onSubmit() {
    this.dataService.changeMessage(this.profileForm.controls['name'].value)
    // console.log(this.profileForm.controls['name'].value)
    // this.router.navigateByUrl('');
    this.router.navigate(['home'])
    // console.warn(this.profileForm.value);
  }

}
