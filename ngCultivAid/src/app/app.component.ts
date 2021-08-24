import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngCultivAid';

  // @HostListener("window:load", ['$event'])
  // clearLocalStorage(_event: any){
  //   let session = sessionStorage.getItem('ref');

  //   if (session == null) {

  //     localStorage.clear();
  //     location.reload();

  //   }
  //   sessionStorage.setItem('ref', '1');
  // }
}
