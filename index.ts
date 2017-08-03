import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SliderComponent } from './slider/slider.component';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizePanelDirective } from './resize-panel.directive';

@NgModule({
  declarations: [
    ResizePanelDirective,
    ResizeHandleDirective,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    SliderComponent,
  ]
})
export class SliderModule { }
