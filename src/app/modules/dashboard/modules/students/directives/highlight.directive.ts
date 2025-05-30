import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.color = 'black';
    this.element.nativeElement.style.fontWeight = 'bold';
    this.element.nativeElement.style.fontSize= '20px';
   }

}
