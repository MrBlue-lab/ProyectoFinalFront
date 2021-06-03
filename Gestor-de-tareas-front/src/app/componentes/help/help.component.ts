import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  tableros =[ 
    {
      'nombre':'todo',
      'datos':[
        {'valor':'A1'},
        {'valor':'A2'},
        {'valor':'A3'},
        {'valor':'A4'}
      ]
    },{
      'nombre':'done',
      'datos':[
      {'valor':'B1'},
      {'valor':'B2'},
      {'valor':'B3'},
      {'valor':'B4'},
      {'valor':'B5'}
    ]
    }];
  
  constructor() { 
    
  }

  drop(event: CdkDragDrop<Object[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
                        console.log(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  drop2(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
                        console.log(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  

  ngOnInit(): void {
  }

}
