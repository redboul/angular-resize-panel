import { Directive, ElementRef, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

@Directive({
  selector: '[resizeHandle]'
})
export class ResizeHandleDirective {

  private mouseDown = false;
  public startCoordinates: { x, y };
  private mouseUpSubscription: Subscription;
  private mouseMoveSubscription: Subscription;
  public mouseMove$: EventEmitter<{ pageX, pageY }> = new EventEmitter<{ pageX, pageY }>();
  public mouseDown$: EventEmitter<string> = new EventEmitter<string>();
  constructor(private element: ElementRef) { }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(startEvent: any) {
    if (startEvent.touches && startEvent.touches.length === 1) {
      this.startCoordinates = { x: startEvent.touches[0].pageX, y: startEvent.touches[0].pageY };
    } else {
      this.startCoordinates = { x: startEvent.pageX, y: startEvent.pageY };
    }
    this.unsubscribeFromEvent();
    this.mouseMoveSubscription = Observable.
      merge(
      Observable.fromEvent(document, 'mousemove')
        .do((event: any) => {
          event.preventDefault();
          event.stopPropagation();
        })
        .map((event: any) => ({ pageX: event.pageX, pageY: event.pageY })),
      Observable.fromEvent(document, 'touchmove')
        .filter((event: any) => event.touches.length === 1)
        .map((event: any) => ({ pageX: event.touches[0].pageX, pageY: event.touches[0].pageY }))
      ).subscribe((event: MouseEvent) => this.onMouseMove(event));
    this.mouseUpSubscription = Observable.
      merge(
      Observable.fromEvent(document, 'mouseup')
        .do((event: any) => {
          event.preventDefault();
          event.stopPropagation();
        })
        .map((event: any) => ({ x: event.pageX, y: event.pageY })),
      Observable.fromEvent(document, 'touchend')
        .filter((event: any) => event.changedTouches.length === 1)
        .do((event: any) => {
          event.preventDefault();
          event.stopPropagation();
        })
        .map((event: any) => ({ x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY })))
      .subscribe((event: MouseEvent) => this.onMouseUp(event));
  }
  onMouseUp(event: { x, y }) {
    if (event.x === this.startCoordinates.x && event.y === this.startCoordinates.y) {
      this.mouseDown$.next('click');
    }
    this.unsubscribeFromEvent();
  }

  unsubscribeFromEvent() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
      this.mouseMoveSubscription = null;
    }
    if (this.mouseUpSubscription) {
      this.mouseUpSubscription.unsubscribe();
      this.mouseUpSubscription = null;
    }
  }
  onMouseMove(event: { pageX, pageY }) {
    this.mouseMove$.next(event);
  }

}
