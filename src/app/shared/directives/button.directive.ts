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
      this.el.nativeElement.classList.add(
        'p-2', 'text-blue-500', 'hover:text-blue-600', 'hover:underline', 'cursor-pointer'
      );
    } else {
      this.el.nativeElement.classList.add(
        'p-2', 'rounded', 'text-gray-100', 'focus:outline-none', 'disabled:opacity-40',
        'bg-green-500', 'hover:bg-green-600', 'shadow-sm', 'transition', 'ease-in-out', 'duration-300'
      );
    }
  }
}
