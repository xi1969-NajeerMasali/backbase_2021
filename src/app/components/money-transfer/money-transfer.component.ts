import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router
  )
  { }

  ngOnInit(): void {
    this.accountForm =  this.formbuilder.group({
      toAccount: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })

  }

  accountInfo(){
    console.log('skdjskjdks', this.accountForm.value)
  }

  goToHistory(){
    this.router.navigate(['/history'])
  }
}
