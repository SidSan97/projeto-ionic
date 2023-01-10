import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  url : string = "";
  nivel : string = "";

  public appPages = [
    { title: 'Home', url: '/folder', icon: 'home' },
    { title: 'Usuario', url: '/usuarios', icon: 'person-add' },
    { title: 'Testar Login', url: '/login', icon: 'log-in' }/*,
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },*/
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router) {

    //saber em qual url esta o APP
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(this.url);
      }
    });
  }
}
