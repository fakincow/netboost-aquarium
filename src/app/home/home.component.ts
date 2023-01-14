import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements  OnInit{
  
public selectedColor:string = 'grey'
onColorChanged(color: string){
  this.selectedColor = color;
}
fishColorChanged(e:any){
  console.log('fishColorChanged',e);
}
ngOnInit(): void {

}

}
