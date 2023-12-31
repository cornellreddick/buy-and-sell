import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { ListingsDetailPageComponent } from './listings-detail-page/listings-detail-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MyListingsPageComponent } from './my-listings-page/my-listings-page.component';
import { NewListingPageComponent } from './new-listing-page/new-listing-page.component';
import { EditListingPageComponent } from './edit-listing-page/edit-listing-page.component';
import { TodoComponent } from './todo-page/todo/todo.component';
import { TodosComponent } from './todos-page/todos/todos.component';
import { UserComponent } from './user/user/user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Child1Component } from './child1/child1/child1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackgroundChangeDirective } from './background-change.directive';
import { FullNamePipe } from './full-name.pipe';
import { InterceptorService } from './interceptor.service';
import { AuthGaurdService } from './auth-gaurd.service';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { ClickDirective } from './click.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { PersonModule } from './person/person/person.module';
import { PersonComponent } from './person/person/person.component';
import { PeopleComponent } from './people/people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingsPageComponent,
    ListingsDetailPageComponent,
    ContactPageComponent,
    MyListingsPageComponent,
    NewListingPageComponent,
    EditListingPageComponent,
    TodoComponent,
    TodosComponent,
    Child1Component,
    BackgroundChangeDirective,
    FullNamePipe,
    ClickDirective,
    PeopleComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    UsersModule,
    CarsModule.forRoot({apiUrl: 'http://localhost:3000'} ),
    ReactiveFormsModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }, AuthGaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
