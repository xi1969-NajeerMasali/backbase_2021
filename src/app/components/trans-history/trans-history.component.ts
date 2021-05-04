import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-trans-history',
  templateUrl: './trans-history.component.html',
  styleUrls: ['./trans-history.component.css']
})
export class TransHistoryComponent implements OnInit {
  orderList: any;
  searchText

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions(){
    this.transactionService.getTransactionOrderList().subscribe((res: any) => {
      console.log('res', res)
      if(res){
        this.orderList = res.data
        this.orderList.sort((a, b) => {
          return b.dates.valueDate - a.dates.valueDate
        })
      }
    })
  }

}
