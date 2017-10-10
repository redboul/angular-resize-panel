import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizeBarDirective } from './resize-bar.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizePanelComponent } from './resize-panel.component';

describe('ToolboxComponent', () => {
  let component: DivToBeResizedComponent;
  let fixture: ComponentFixture<DivToBeResizedComponent>;
  let resizeComponent: ResizePanelComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
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
  [reducedSize]="50">
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
}
