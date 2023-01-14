import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Output() onColorChanged = new EventEmitter<string>();
  colors = [
    'RED',
    'BLUE',
    'GREEN'
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log('event.container', this.colors);
    moveItemInArray(this.colors, event.previousIndex, event.currentIndex);
    console.log('event.container 22', this.colors);
  }
  selectedColor = 'grey';
  redBtnClass = 'redBtn';
  blueBtnClass = 'blueBtn';
  greenBtnClass = 'greenBtn';
  resetButtons() {
    this.redBtnClass = ' ';
    this.blueBtnClass = ' ';
    this.greenBtnClass = ' ';
  }

  onBtnSelect(e: any) {
    this.resetButtons();
    console.log('select btn 1', e.target.id)
    this.selectedColor = String(e.target.id).toLocaleLowerCase();
    if (e.target.id == 'red') this.redBtnClass = 'selectedBtn';
    if (e.target.id == 'blue') this.blueBtnClass = 'selectedBtn';
    if (e.target.id == 'green') this.greenBtnClass = 'selectedBtn';
    this.onColorChanged.emit(this.selectedColor);
  }
  MoviesList = [
    'RED',
    'BLUE',
    'GREEN'
  ];
  MoviesWatched = [
  ];
 
}
