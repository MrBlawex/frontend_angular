import { Directive, HostListener, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHoverControl]',
  exportAs: 'hoverControl'
})
export class HoverControlDirective implements OnInit {
  constructor(private el: ElementRef) {}
  @HostListener('mouseover') changeHoverTrue() {
    (this.el.nativeElement.childNodes as HTMLCollection)
      .item(3)
      .getElementsByTagName('button')
      .item(1).style.visibility = 'visible';
    (this.el.nativeElement.childNodes as HTMLCollection)
      .item(3)
      .getElementsByTagName('button')
      .item(0).style.visibility = 'visible';
  }
  @HostListener('mouseout') changeHoverFalse() {
    (this.el.nativeElement.childNodes as HTMLCollection)
      .item(3)
      .getElementsByTagName('button')
      .item(1).style.visibility = 'hidden';
    (this.el.nativeElement.childNodes as HTMLCollection)
      .item(3)
      .getElementsByTagName('button')
      .item(0).style.visibility = 'hidden';
  }

  ngOnInit() {
    this.changeHoverFalse();
  }
}
