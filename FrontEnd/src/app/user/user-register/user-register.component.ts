import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm: FormGroup;
  userSubmitted: boolean;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertyfy: AlertifyService
  ) { }

  public ngOnInit(): void {
    this.createRegisterationForm();
  }

  public createRegisterationForm(): void {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.minLength(10)]]
    }, {
      validators: this.passwordMatchingValidatior
    });
  }

  public passwordMatchingValidatior(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { notmatched: true };
  }

  public get userName(): FormControl {
    return this.registerationForm.get('userName') as FormControl;
  }

  public get email(): FormControl {
    return this.registerationForm.get('email') as FormControl;
  }

  public get password(): FormControl {
    return this.registerationForm.get('password') as FormControl;
  }

  public get confirmPassword(): FormControl {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  public get mobile(): FormControl {
    return this.registerationForm.get('mobile') as FormControl;
  }

  public onSubmit(): void {
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
      this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted = false;
      this.alertyfy.success('Congrats, you are successfully registered');
    } else {
      this.alertyfy.error('Kindly provide the required fields');
    }
  }

  public userData(): User {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    };
  }

  public onReset(): void {
    this.userSubmitted = false;
    this.registerationForm.reset();
  }

}
