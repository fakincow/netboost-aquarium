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
movies = [
  'Episode I - The Phantom Menace',
  'Episode II - Attack of the Clones',
  'Episode III - Revenge of the Sith',
  'Episode IV - A New Hope',
  'Episode V - The Empire Strikes Back',
  'Episode VI - Return of the Jedi',
  'Episode VII - The Force Awakens',
  'Episode VIII - The Last Jedi'
];

}
