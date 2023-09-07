import { Component, OnInit } from '@angular/core';
import {  PersonInterface } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: PersonInterface[] =[];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPerson().subscribe( 
      data => {
      this.person = data;
    })
  }
 

}
