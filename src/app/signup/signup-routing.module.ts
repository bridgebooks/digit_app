import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

const routes: Routes = [
    { path: '', component: SignupComponent },
    {
        path: 'success',
        component: SignupSuccessComponent,
        data: {
            title: 'Sign up successfull - Bridge Books'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SignupRoutingModule { }
