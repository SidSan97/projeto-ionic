import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.page.html',
  styleUrls: ['./mostrar-usuarios.page.scss'],
})
export class MostrarUsuariosPage implements OnInit {

  nome: string = "";
  cpf: string = "";
  email: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";

  constructor(
    private router:Router,
    private provider:Api,
    private actRouter:ActivatedRoute) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.id    = data.id;
      this.nome  = data.nome;
      this.email = data.email;
      this.cpf   = data.cpf;
      this.senha = data.senha;
      this.nivel = data.nivel;

    });
  }

  usuarios(){
    this.router.navigate(['usuarios']);
  }

}
