import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heros.interface';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  heros: Hero[] = [];

  constructor(private herosService: HerosService) { }

  ngOnInit(): void {    
    this.herosService.getHeros().subscribe(res=>{
      this.heros = res;
    })
  }

}
