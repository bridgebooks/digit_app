import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginValidateComponent } from './validate/validate.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    {
      path: 'validate/:user_id',
      component: LoginValidateComponent,
      data: {
        title: 'Activate your account - ZenBooks'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
