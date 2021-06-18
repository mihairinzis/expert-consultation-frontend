import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ecSection]'
})
export class SectionDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(
      'border', 'border-gray-400', 'rounded-lg', 'm-2', 'md:m-3', 'p-6', 'md:p-8'
    );
  }
}
