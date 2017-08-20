import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordCreateComponent } from './password-create.component';

const routes: Routes = [
    { path: '', component: PasswordCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PasswordCreateRoutingModule { }

