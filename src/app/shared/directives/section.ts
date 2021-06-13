import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ecSection]'
})
export class SectionDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(
      'border', 'border-gray-400', 'rounded-lg', 'm-5', 'p-12'
    );
  }
}
