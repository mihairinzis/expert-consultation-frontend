import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[ecButton]'
})
export class ButtonDirective implements OnInit {
  @Input() type: 'primary' | 'secondary';

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (this.type === 'secondary') {
      this.el.nativeElement.classList.add('text-blue-600', 'underline', 'cursor-pointer');
    } else {
      this.el.nativeElement.classList.add('py-2', 'rounded', 'text-gray-100', 'focus:outline-none', 'disabled:opacity-40');
    }
  }
}
