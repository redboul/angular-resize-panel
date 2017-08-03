import { Output, Input, EventEmitter, Directive, ElementRef, ContentChildren, AfterViewInit, QueryList } from '@angular/core';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { eventTypes } from './event-types';
import { ResizeHandleDirective } from './resize-handle.directive';

@Directive({
  selector: '[resizeBar]'
})
export class ResizeBarDirective implements AfterViewInit {

  @Input() private direction: string;
  @Output() handleClick = new EventEmitter<any>();

  @ContentChildren(ResizeHandleDirective)
  private resizeHandles: QueryList<ResizeHandleDirective>;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.direction = this.direction || 'x';
    this.resizeHandles.forEach((handle: ResizeHandleDirective) => {
      handle.mouseMove$.subscribe(mouseEvent => this.increaseSize(mouseEvent));
      handle.mouseDown$
        .subscribe((event) =>
          this.handleClick.next({})
        );
    });
  }

  increaseSize(event: {pageX, pageY}) {
    this.handleClick.next({ type: eventTypes.cancel });
      const rect = this.el.nativeElement.getBoundingClientRect();
    if (this.direction === 'x') {
        this.el.nativeElement.style.width = (rect.width + (rect.left - event.pageX)) + 'px';
    } else if (this.direction === 'y') {
        this.el.nativeElement.style.height = (rect.height + (rect.top - event.pageY)) + 'px';
    }
  }
}
