import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { Fish } from '../Fish';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  id: ReturnType<typeof setInterval> | undefined;
  positionX = 200;
  positionY = 200;
  swimDirectionX = 1;
  swimDirectionY = 1;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // Your row selection code
    console.log(event);
    if (event.keyCode == KEY_CODE.LEFT_ARROW) {
      this.swimDirectionX = -1;
    }
    if (event.keyCode == KEY_CODE.RIGHT_ARROW) {
      this.swimDirectionX = 1;
    }
    if (event.keyCode == KEY_CODE.UP_ARROW) {
      this.swimDirectionY = -1;
    }
    if (event.keyCode == KEY_CODE.DOWN_ARROW) {
      this.swimDirectionY = 1;
    }
  }

  clearCanvas() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }
  ngOnInit(): void {
    this.drawBorderLine();
  }

  drawBorderLine() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx) {
      let image = new Image();
      image.src = "../../assets/images/fish.png";

      image.onload = () => {
        this.id = setInterval(() => {
          if(this.positionX < 0){
            this.swimDirectionX  = 1;
            this.positionX = 0;
          }
          if(this.positionX > 600){
            this.swimDirectionX  = -1
          }
          this.positionX += 5 * this.swimDirectionX;
         // this.positionY += 5 * this.swimDirectionY;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();  // save the current canvas state
          ctx.setTransform(
            this.swimDirectionX < 0 ? -1 : 1, 0, // set the direction of x axis
            0, 1,   // set the direction of y axis
            this.positionX * this.swimDirectionX ? image.width : 300, // set the x origin
            this.positionY   // set the y origin
          );
          ctx.drawImage(image,  this.positionX*this.swimDirectionX,  this.positionY*this.swimDirectionY);
          ctx.restore(); // restore the state as it was when this function was called

        }, 50)
      }

    }


  }

}
export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}