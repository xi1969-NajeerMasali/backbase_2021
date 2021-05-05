import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Helpers } from '../../_helpers/helpers'

import * as $ from 'jquery';
@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  accountForm: FormGroup;
  formData: any;
  submitted = false;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router
  )
  { }

  ngOnInit(): void {
    this.accountForm =  this.formbuilder.group({
      pAccount:['My Personal Account: $5824.76'],
      toAccount: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })
  }

  get f() { return this.accountForm.controls; }

  accountInfo(){
    this.submitted = true;
    // console.log('skdjskjdks', this.accountForm.value)
    if (this.accountForm.invalid) {
      return;
    }
    this.formData = this.accountForm.value
    Helpers.openModal('exampleModal')
  }

  goToHistory(){
    this.router.navigate(['/history'])
  }
}
