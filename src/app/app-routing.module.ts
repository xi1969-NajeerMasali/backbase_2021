import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyTransferComponent } from './components/money-transfer/money-transfer.component';
import { TransHistoryComponent } from './components/trans-history/trans-history.component';

const appRoutes: Routes = [
  {path: '', component: MoneyTransferComponent},
  {path:'history', component: TransHistoryComponent},
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
