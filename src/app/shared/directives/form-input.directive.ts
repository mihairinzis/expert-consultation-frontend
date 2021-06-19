import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[ecFormInput]'
})
export class FormInputDirective implements OnInit, OnChanges {
  @Input() hasErrors: boolean;
  @Input() isTouched: boolean;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(
      'w-full', 'h-10', 'px-3', 'text-base', 'placeholder-gray-600',
      'border', 'rounded-lg', 'focus:shadow-outline', 'font-light', 'placeholder-opacity-75'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasErrors && this.isTouched) {
      this.el.nativeElement.classList.add('border-red-700');
    } else {
      this.el.nativeElement.classList.remove('border-red-700');
    }
  }
}
