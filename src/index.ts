import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ResizePanelComponent } from './resize-panel.component';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizeBarDirective } from './resize-bar.directive';

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
export class ResizePanelModule { }
