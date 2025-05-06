import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import autoAnimate, { AnimationController } from '@formkit/auto-animate';

@Directive({
  selector: '[auto-animate]',
  standalone: true,
})
export class AutoAnimateDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private controller!: AnimationController<HTMLElement>;

  ngOnInit() {
    this.controller = autoAnimate(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.controller.destroy!();
  }
}
