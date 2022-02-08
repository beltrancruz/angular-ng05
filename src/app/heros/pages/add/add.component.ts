import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heros.interface';
import { HerosService } from '../../services/heros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: ''
  }

  publishers = [
    {
      id: 'DC Comics',
      description: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel-Comics'
    }
  ]

  constructor(
    private herosService : HerosService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    if(this.router.url.includes('edit')){
      this.activatedRoute.params
      .pipe(switchMap(params=>{ return this.herosService.getHero(params.id)}))
      .subscribe((res)=>{ this.hero = res })
    }

    
  }


  save(){
    if(this.hero.superhero.trim().length === 0){
      return;
    }

    if(this.hero.id){
      this.herosService.updateHero(this.hero).subscribe(res=>{
        if(res){
          this.showMessage('Record updated')
          this.router.navigate(['/heros',res.id])
          
        }
      })
    }else{
      this.herosService.saveHero(this.hero).subscribe(res=>{
        if(res){
          this.showMessage('Record saved')
          this.router.navigate(['/heros/edit',res.id])
          
        }
      })
    }

  }

  delete(){
    const res = this.dialog.open(ConfirmComponent,{
      data: {...this.hero}
    })

    res.afterClosed().subscribe(res=>{
      if(res){
        this.herosService.deleteHero(this.hero.id!).subscribe(()=>{
          this.router.navigate(['/heros/list'])
        })
      }
    })

  }

  showMessage(msg: string):void{
    this.snackBar.open(msg,'Ok', { duration: 3000 })
  }


}
