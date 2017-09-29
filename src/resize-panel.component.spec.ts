import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizeBarDirective } from './resize-bar.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizePanelComponent } from './resize-panel.component';

describe('ToolboxComponent', () => {
  let component: ResizePanelComponent;
  let fixture: ComponentFixture<ResizePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ ResizePanelComponent, ResizeBarDirective, ResizeHandleDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
