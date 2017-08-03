
# Angular Resize Panel

## TL;DR

Yet another Angular resize panel module.

## Motivation

This library aims to provide an Angular resize element module with only `@angular/animations` as dependency. 

## Installation

```
npm i -D angular-resize-panel
```

or

```
yarn add angular-resize-panel
```

## Features

There are three expected behaviours:
* Press mouse on resize bar and move mouse to change the panel size in one direction
* Click on resize bar when it is open to collapse it with ease animation
* Click on resize bar when it is closed to expand it with ease animation

## Usage

If you use SystemJS to load your files, you might have to update your config:

```javascript
System.config({
    map: {
        'angular-resize-panel': 'node_modules/angular-resize-panel/bundles/index.umd.js'
    }
});
```

Import `ResizePanelModule` in the `NgModule` of your application.

```javascript
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {ResizePanelModule} from 'angular-resize-panel';

@NgModule({
    imports: [
        BrowserModule,
        ResizePanelModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Develop

Install dependencies with:

```
npm i
```

or

```
yarn
```

### Test

Karma is doing the job

```
npm test
```

or 
```
yarn test
```


### Build

```
npm run build
```

or 
```
yarn run build
```



## Status

Currently working in Chrome with mouse and tap events.  
Working in Firefox but text in panel seems to be selected  