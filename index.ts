import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ResizePanelComponent } from './src/resize-panel.component';
import { ResizeHandleDirective } from './src/resize-handle.directive';
import { ResizeBarDirective } from './src/resize-bar.directive';

@NgModule({
  declarations: [
    ResizeBarDirective,
    ResizeHandleDirective,
    ResizePanelComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    ResizePanelComponent,
  ]
})
export class SliderModule { }
