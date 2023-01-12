import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private http: HttpClient,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.getData();
  }

  @ViewChild('popover') popover:any;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  NoPresentPopover() {
    this.isOpen = false;
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getData();
      event.target.complete();
    }, 2000);
  };


  async mensagemSucesso(codigo:number) {

    if(codigo == 1) {
      const toast = await this.toastController.create({
        message: 'Sucesso ao excluir usuario',
        duration: 2000,
        color: 'success'
      })
      toast.present();
    }
  }

  async mensagemErro(codigo:number) {

    if(codigo == 1) {
      const toast = await this.toastController.create({
        message: 'Não há usuários com os dados informado',
        duration: 5000,
        color: 'danger'
      })

      toast.present();
    }
    else if(codigo == 2)
    {
      const toast = await this.toastController.create({
        message: 'Erro ao excluir usuário',
        duration: 2000,
        color: 'danger'
      })

      toast.present();
    }
  }

getData() {
    //this.http.get('https://testeapisidsan.000webhostapp.com/api-ionic/index.php?q=listar').subscribe((data:any) => {
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

        //this.http.get('http://localhost/api-ionic/index.php?q=busca&v=' + this.nome).subscribe((data:any) => {
        this.http.get('https://testeapisidsan.000webhostapp.com/api-ionic/index.php?q=busca&v=' + this.nome).subscribe((data:any) => {

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
          //this.clientes.push(data['status']);
          console.log('dados sem busca');
          this.mensagemErro(1);
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

        //this.http.get('http://localhost/api-ionic/index.php?q=excluir&v=' + id).subscribe((data:any) => {
        this.http.get('https://testeapisidsan.000webhostapp.com/api-ionic/index.php?q=excluir&v=' + id).subscribe((data:any) => {

        if(data['status'] == 200)
        {
          console.log('excluido com sucesso');
          this.router.navigate(['usuarios']);
          this.mensagemSucesso(1);
        }
        else
        {
          console.log('erro ao excluir');
          this.mensagemErro(2);
        }

      });
    });
  }

}
