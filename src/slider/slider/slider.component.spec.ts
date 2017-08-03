import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalSliderComponent } from './horizontal-slider.component';

describe('ToolboxComponent', () => {
  let component: HorizontalSliderComponent;
  let fixture: ComponentFixture<HorizontalSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
