import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared';


const appRoutes: Routes = [
  {
      path: '',
      loadChildren: './layout/layout.module#LayoutModule',
      canActivate: [AuthGuard]
  },
  {
      path: 'login',
      loadChildren: './login/login.module#LoginModule',
      data: {
        title: 'Login - DigIT'
      }
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule',
    data: {
      title: 'Sign Up - DigIT'
    }
  },
  {
    path: 'passwordreset',
    loadChildren: './password-reset/password-reset.module#PasswordResetModule',
    data: {
      title: 'Forgot Password - DigIT'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}