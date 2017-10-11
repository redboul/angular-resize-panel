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

  it('should move panel size', fakeAsync(() => {
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
    const subscription = component.resized$.subscribe(event => {
      expect(event).toEqual('done');
      expect(fixture.debugElement.query(By.css('resize-panel div')).nativeElement.style.width).toEqual('50px');
      subscription.unsubscribe();
    });
    flushMicrotasks();
    fixture.detectChanges();
  }));

  xit('should close panel', () => {
    const elm: HTMLElement = fixture.debugElement.query(By.css('resize-panel')).nativeElement;
    console.log('width:', fixture.debugElement.query(By.css('resize-panel')).nativeElement.style.width);
    fixture.debugElement.query(By.css('.handleBar-handle-vertical')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log('now:', fixture.debugElement.query(By.css('resize-panel')).nativeElement.style.width)
    });
  });
  it('should create the resize-panel with default values', () => {
    expect(component).toBeTruthy();
    expect(resizeComponent.slideState).toEqual({ value: 'cancel' });
    expect(resizeComponent.type).toEqual('');
    fixture.debugElement.query(By.css('.square'));
  });
});
@Component({
  selector: 'handle-bar-container',
  template: `<resize-panel class="square" 
  [defaultSize]="300"
  [reducedSize]="50" (resized)="emitResized($event)">
    <div class="content">Balèze !!!
    </div>
</resize-panel>`,
  styles: [
    `.square {
      position: absolute;
      overflow: hidden;
      right: 0;
      background-color: green;
      /*transition: width 0.5s ease-out, height 2s ease-out;*/
  }
  
  .carre {
      position: absolute;
      overflow: hidden;
      /*transition: width 0.5s ease-out, height 2s ease-out;*/
  }
  
  .content {
    height: 100%;
    width: 100%;
    min-height: 100px;
    min-width: 30px;  
  }`,
  `
  .first {
      bottom: 0;
  }`,`
  .red {
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
