import { Component, ElementRef, Inject, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-aquarium',
  templateUrl: './aquarium.component.html',
  styleUrls: ['./aquarium.component.css'],
  animations: [
    trigger('borderHit', [
      state('start', style({
        opacity: 1,
        transform: 'scale(1)',
      })),
      state('idle', style({
        backgroundColor: '#b3d9ff',
        opacity: 1,
      })),
      state('blinking', style({
        backgroundColor: 'red',
        opacity: 1,
      })),
      transition('idle => blinking', [
        animate('3s',)
      ]),
      transition('blinking => idle', [
        animate('1s')
      ]),
    ]),
  ]
})
export class AquariumComponent implements OnDestroy, OnInit {
  @Input() selectedColor: string = 'grey';
  position: { x: number, y: number } = { x: 200, y: 200 };

  collision: boolean = false;
  xdirection: number = 0;
  ydirection: number = 0;
  min: number = -1;
  max: number = 1;
  swimSpeed: number = 100;
  fishSize = 300;
  fishClass = 'right grey'
  container = 'aqua-border'
  aiInterval: ReturnType<typeof setInterval> | undefined;
  borderLimit: number = 1000 - this.fishSize;
  constructor(@Inject(DOCUMENT) private _document: Document) { }
  id: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.randomizeDirection();
    this.aiInterval = setInterval(() => {
      this.randomizeDirection();
    }, 5000)
  }

  randomizeDirection() {
    this.xdirection = Math.floor(Math.random() * 2);
    this.ydirection = Math.floor(Math.random() * 2);
    if (this.xdirection == 0) {
      this.xdirection = -1;
    }
    if (this.ydirection == 0) {
      this.ydirection = -1;
    }
    this.startSwim();
  }

  startSwim() {
    this.id = setInterval(() => {
      this.startMoving();
    }, this.swimSpeed)
  }
  stopSwim() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  validateBorderHitAreaX(): boolean {
    if (this.position.x >= this.borderLimit || this.position.x <= 0) {
      return true;
    }
    return false;
  }
  validateBorderHitAreaY(): boolean {
    if (this.position.y >= this.borderLimit || this.position.y <= 0) {
      return true;
    }

    return false;
  }
  flipFish() {
    if (this.xdirection > 0) {
      this.fishClass = 'right' + ' ' + this.selectedColor;
    } else {
      this.fishClass = 'left' + ' ' + this.selectedColor;
    }
  }
  changeSwimDirection() {
    this.randomizeDirection();
  }
  startMoving() {
    let collidedX = this.validateBorderHitAreaX();
    let collidedY = this.validateBorderHitAreaY();
    if (collidedX) {
      this.xdirection *= -1;
    }
    if (collidedY) {
      this.ydirection *= -1;
    }
    if (collidedX || collidedY) {
      this.container = 'hitEffect'
      this.collision = true;
    }


    this.flipFish();
    this.position.x += (this.xdirection * 4);
    this.position.y += (this.ydirection * 4);
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
    if (this.aiInterval) {
      clearInterval(this.aiInterval);
    }
  }
}
