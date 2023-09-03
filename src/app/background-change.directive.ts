import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBackgroundChange]'
})
export class BackgroundChangeDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
   }

}
