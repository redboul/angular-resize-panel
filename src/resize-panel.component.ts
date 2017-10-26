import { slide } from './animations';
import { eventTypes } from './event-types';

import { Component, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'resize-panel',
  templateUrl: './resize-panel.component.html',
  styleUrls: ['./resize-panel.component.css'],
  animations: [ slide ]
})
export class ResizePanelComponent implements OnInit {
  @Input() direction?: string;
  @Input() defaultSize?: number;
  @Input() reducedSize?: number;
  @Output() resized = new EventEmitter();
  slideState: any;
  type = '';
  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.direction === 'y') {
      this.type = 'v';
    }
    this.slideState = { value: `${this.type}cancel`};
    if (!this.defaultSize) {
      if (this.direction === 'y') {
        this.defaultSize = this.el.nativeElement.offsetHeight;
      } else {
        this.defaultSize = this.el.nativeElement.offsetWidth;
      }
    }
    if (!this.reducedSize) {
      this.reducedSize = 0;
    }
  }

  openPanel() {
    this.togglePanel({type: eventTypes.clickedInside, amount: this.defaultSize});
  }

  animationDone(event) {
    if (this.slideState && this.slideState.params && this.slideState.params.amount !== undefined) {
      if (this.direction === 'y') {
        event.element.style.height = this.slideState.params.amount + 'px';
      } else {
        event.element.style.width = this.slideState.params.amount + 'px';
      }
    }
    this.resized.next('done');
  }

  togglePanel(event) {
    if (event.type === eventTypes.cancel) {
      this.slideState = { value: `${this.type}cancel` };
    } else {
      if (this.slideState.value !== `${this.type}out` && event.type !== eventTypes.clickedInside) {
        this.slideState = { value: `${this.type}out`, params: { amount: this.reducedSize }};
      } else if (this.slideState.value === `${this.type}out`) {
        this.slideState = { value: `${this.type}in`, params: { amount: event.amount || this.defaultSize} };
      }
    }
  }

}
