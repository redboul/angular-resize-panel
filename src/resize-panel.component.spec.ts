import { By, BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizeBarDirective } from './resize-bar.directive';
import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { trigger } from '@angular/animations';

import {Subject} from 'rxjs/Subject';

import { ResizePanelComponent } from './resize-panel.component';

describe('ToolboxComponent', () => {
  let component: DivToBeResizedComponent;
  let fixture: ComponentFixture<DivToBeResizedComponent>;
  let resizeComponent: ResizePanelComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, BrowserAnimationsModule],
      declarations: [ DivToBeResizedComponent, ResizePanelComponent, ResizeBarDirective, ResizeHandleDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivToBeResizedComponent);
    component = fixture.componentInstance;
    resizeComponent = fixture.debugElement.query(By.css('resize-panel')).componentInstance;
    fixture.detectChanges();
  });

  const triggerDomEvent: Function = (eventType: string, target: HTMLElement | Element, eventData: Object = {}) => {
    const event: Event = document.createEvent('Event');
    Object.assign(event, eventData);
    event.initEvent(eventType, true, true);
    target.dispatchEvent(event);
  };

  const executeEventsAndReturnWidth = (domEvents): number => {
    const elm: HTMLElement = fixture.debugElement.query(By.css('.handleBar-handle-vertical')).nativeElement;
    domEvents.forEach(event => {
      triggerDomEvent(event.name, elm, event.data);
    });
    flushMicrotasks();
    fixture.detectChanges();
    const width = fixture.debugElement.query(By.css('resize-panel div')).nativeElement.style.width;
    return Number(width.substring(0, width.length - 2));
  }

  it('moves panel size', fakeAsync(() => {
    const domEvents: any[] = [{
      name: 'mousedown',
      data: {
        pageX: 150,
        pageY: 200
      }
    }, {
      name: 'mousemove',
      data: {
        pageX: 155,
        pageY: 200
      }
    }];
    const firstWidth = executeEventsAndReturnWidth(domEvents);
    const secondWidth = executeEventsAndReturnWidth([{name: 'mousemove', data: {
      pageX: 145,
      pageY: 200
    }}]);
    expect(secondWidth - firstWidth).toEqual(10);
  }));


  fit('closes panel and opens it', fakeAsync(() => {
    const domEvents: any[] = [{
      name: 'mousedown',
      data: {
        pageX: 150,
        pageY: 200
      }
    }, {
      name: 'mouseup',
      data: {
        pageX: 150,
        pageY: 200
      }
    }];
    const elm: HTMLElement = fixture.debugElement.query(By.css('.handleBar-handle-vertical')).nativeElement;
    domEvents.forEach(event => {
      triggerDomEvent(event.name, elm, event.data);
    });
    let formerWidth;
    const subscription = component.resized$.subscribe(event => {
      expect(event).toEqual('done');
      console.log('width', formerWidth);
      if (!formerWidth) {
        formerWidth = fixture.debugElement.query(By.css('resize-panel div')).nativeElement.style.width;
        expect(formerWidth).toEqual('50px');
        console.log('pouet');
      } else {
        formerWidth = fixture.debugElement.query(By.css('resize-panel div')).nativeElement.style.width;
        expect(formerWidth).toEqual('300px');
        console.log('caca');
      }
    });
    flushMicrotasks();
    fixture.detectChanges();
    console.log('coucou', fixture.debugElement.query(By.css('resize-panel div')).nativeElement.style.width);

    domEvents.forEach(_event => {
      triggerDomEvent(_event.name, elm, _event.data);
    });
    flushMicrotasks();
    fixture.detectChanges();
  }));
});
@Component({
  selector: 'handle-bar-container',
  template: `<resize-panel class="square" 
  [defaultSize]="300"
  [reducedSize]="50" (resized)="emitResized($event)">
    <div class="content">Balèze !!!</div></resize-panel>`,
  styles: [
    `.square {
      position: absolute;
      overflow: hidden;
      right: 0;
      background-color: green;
  }
  
  .carre {
      position: absolute;
      overflow: hidden;
  }
  
  .content {
    height: 100%;
    width: 100%;
    min-height: 100px;
    min-width: 30px;  
  }`, `.first {
      bottom: 0;
  }`, `.red {
      background-color: red;
  }`
  ]
})
class DivToBeResizedComponent {
  resized$ = new Subject();
  emitResized(event) {
    this.resized$.next(event);
  }
}
