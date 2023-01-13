import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Output() onColorChanged = new EventEmitter<string>();
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
    console.log('select btn 1', e.target.classList)
    this.selectedColor = e.target.id;
    if (e.target.id == 'red') this.redBtnClass = 'selectedBtn';
    if (e.target.id == 'blue') this.blueBtnClass = 'selectedBtn';
    if (e.target.id == 'green') this.greenBtnClass = 'selectedBtn';
    this.onColorChanged.emit(this.selectedColor);
  }
}