import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { DatabaseService } from 'src/app/services/database.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup
  id: string
  user: User
  constructor(private httpClient: HttpClient, private database: DatabaseService, private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.user.subscribe(data => {
      this.user = data;
    })
    this.database.getUserId()
      .subscribe(data => {
        this.id = data;
      })

    this.resetPasswordForm = new FormGroup({
      'old': new FormControl(null, Validators.required),
      'new': new FormControl(null, Validators.required),
      'repeat': new FormControl(null, Validators.required)
    })
  }

  onSubmit(data: FormGroup) {
    const pass = data.value.new;

    this.database.changeUserPassword(this.id, pass)
      .subscribe(() => {
        this.firebase.firebaseAuthChangeUserPassword(this.user.token, pass)
          .subscribe(() => {
            this.clearForm();
          })
      })
  }


  clearForm() {
    this.resetPasswordForm.reset();
  }
}



