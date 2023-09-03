import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user/user.component';
import { UsersService } from '../users.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from '../auth-gaurd.service';

const routes: Routes = [
  {path: 'users', component: UserComponent, canActivate: [AuthGaurdService]}
]

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ], 
  providers: [UsersService],
  exports: [UserComponent]
})
export class UsersModule { }
