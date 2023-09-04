import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup
  id: string
  constructor(private httpClient: HttpClient, private database: DatabaseService) { }

  ngOnInit() {
    this.database.getUserId()
      .subscribe(data => {
        this.id = data;
        console.log(this.id)
      })

    this.resetPasswordForm = new FormGroup({
      'old': new FormControl(null, Validators.required),
      'new': new FormControl(null, Validators.required),
      'repeat': new FormControl(null, Validators.required)
    })
  }

  onSubmit(data: FormGroup) {
    const pass = data.value.new;
    console.log(pass)
    this.database.changeUserPassword(this.id, pass)
      .subscribe(data => {
        console.log(data);
      })
  }


  clearForm() {
    this.resetPasswordForm.reset();
  }
}
