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
    moveItemInArray(this.colors, event.previousIndex, event.currentIndex);
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
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }  
}
