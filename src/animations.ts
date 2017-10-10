import { animate, animateChild, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';
import { animation } from '@angular/animations';

const slideInHorizontally = animation([ animate('400ms ease', style({
    width: '{{ amount }}px'
  }))]);
const slideOutHorizontally = animation([ animate('400ms ease', style({
    width: '{{ amount }}px'
  }))]);
const slideInVertically = animation([ animate('400ms ease', style({
    height: '{{ amount }}px'
  }))]);
const slideOutVertically = animation([ animate('400ms ease', style({
    height: '{{ amount }}px'
  }))]);
export const slide = trigger('slide', [
  // transition('* => out', [slideOutHorizontally]),
  transition('in => out', [slideOutHorizontally], { params: {amount: 30} }),
  transition('cancel => out', [slideOutHorizontally], { params: {amount: 30} }),
  transition('out => in', [slideInHorizontally], { params: {amount: 140} }),
  transition('vcancel => vout', [slideOutVertically], { params: {amount: 30} }),
  transition('vin => vout', [slideOutVertically], { params: {amount: 30} }),
  transition('vout => vin', [slideInVertically], { params: {amount: 140} })
]);
