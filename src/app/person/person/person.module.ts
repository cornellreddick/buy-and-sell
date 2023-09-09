import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { PersonService } from '../person.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: PersonComponent}
]


@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
 
  ],
  providers: [PersonService]
})
export class PersonModule { }
