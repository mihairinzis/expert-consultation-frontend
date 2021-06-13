import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ecPrimaryButton]'
})
export class PrimaryButtonDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(
      'h-10', 'px-5', 'py-2', 'rounded', 'text-gray-100', 'focus:outline-none', 'disabled:opacity-40'
    );
  }
}
