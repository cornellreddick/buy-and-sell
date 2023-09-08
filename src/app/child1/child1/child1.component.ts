import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit {
  // Property 'currentPage' has no initializer and is not definitely assigned in the constructor. Solved this error
  @Input() currentPage?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
