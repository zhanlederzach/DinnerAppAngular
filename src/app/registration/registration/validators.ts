import {FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export const EmailValidation = [Validators.required, Validators.email];

export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordAgain').value && control.dirty);
  }
}

// export function RepeatPasswordValidator(group: FormGroup) {
//   const password = group.controls.password.value;
//   const passwordConfirmation = group.controls.passwordAgain.value;
//
//   return password === passwordConfirmation ? null : {passwordsNotEqual: true};
// }

export const RepeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.controls.password.value;
  const passwordConfirmation = control.controls.passwordAgain.value;

  console.log(password, passwordConfirmation);
  console.log(control.valid);

  return password && passwordConfirmation && password === passwordConfirmation ? null : { passwordsNotEqual: true };
};
