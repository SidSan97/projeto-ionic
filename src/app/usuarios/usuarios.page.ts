import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  clientes : any = [];
  limit : number = 10;
  start : number = 0;
  nome  : string = "";

  constructor(
    private router:Router,
    private provider:Api,
    private actRouter:ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.getData();
  }


getData() {
    this.http.get('http://localhost/api-ionic/index.php?q=listar').subscribe((data:any) => {
      let a = data.dados;

      this.clientes = [];
      for(let i in a)
      {
        console.log(a[i]);
        this.clientes.push(a[i])
      }

    });

  }

}
