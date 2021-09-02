import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  onSubmit() {
    const rawValues = this.form.getRawValue();

    const body = {
      "ToAddresses": ["jose.coque@db1.com.br"],
      "Source": "jose.coque@db1.com.br",
      "Text": rawValues.text,
      "Subject": rawValues.subject + ' - Feedback de ' + rawValues.name
  }

    this.http.post(environment.API_URL, body).toPromise().then(() => {
      this.openSnackBar('Email enviado. Obrigado! ;)', 'Fechar', 3000);

      this.form.reset();
    }).catch(err => {
      this.openSnackBar('Ocorreu um erro! :(', 'Fechar', 3000);
    })
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {
      duration
    });
  }

}
