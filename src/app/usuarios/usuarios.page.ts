import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('popover') popover:any;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

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
        console.log(a[i] + "nome: " + this.nome);
        this.clientes.push(a[i])
      }

    });

  }

  addUsuarios(){
    this.router.navigate(['add-usuario']);
  }

  carregar(){
    return new Promise(resolve => {
      this.clientes = [];

      let dados = {
        requisicao : 'listar',
        nome : this.nome,
      };

        this.http.get('http://localhost/api-ionic/index.php?q=busca&v=' + this.nome).subscribe((data:any) => {

        if(data['status'] == 200)
        {
          let a = data.dados;

          this.clientes = [];
          for(let i in a)
          {
            this.clientes.push(a[i])
          }
        }
        else
        {
          this.clientes.push(data['status']);
          console.log('dados sem busca');
        }

      });
    });
  }

  editar(id:number, nome:string, cpf:string, email:string, senha:string, nivel:string) {
    this.router.navigate(['add-usuario/' + id + '/' + nome + '/' + cpf + '/' + email + '/' + senha + '/' + nivel]);
  }

  mostrar(id:number, nome:string, cpf:string, email:string, senha:string, nivel:string) {
    this.router.navigate(['mostrar-usuarios/' + id + '/' + nome + '/' + cpf + '/' + email + '/' + senha + '/' + nivel]);
  }

  deletar(id:number)
  {
    return new Promise(resolve => {
      this.clientes = [];

        this.http.get('http://localhost/api-ionic/index.php?q=excluir&v=' + id).subscribe((data:any) => {

        if(data['status'] == 200)
        {
          console.log('excluido com sucesso');
          this.router.navigate(['add-usuario']);
        }
        else
        {
          console.log('erro ao excluir');
        }

      });
    });
  }

}
