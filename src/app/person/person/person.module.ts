import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { PersonService } from '../person.service';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers} from 'src/app/store/reducers';

const routes: Routes = [
  {path: '', component: PersonComponent}
]


@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('persons',reducers)
  ],
  providers: [PersonService]
})
export class PersonModule { }
