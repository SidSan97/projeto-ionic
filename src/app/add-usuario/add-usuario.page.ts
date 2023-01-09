import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { resolve } from 'dns';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  nome: string = "";
  cpf: string = "";
  email: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";


  constructor(
    private router:Router,
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController) { }

  ngOnInit() {
    this.mensagemSucesso();
    this.actRouter.params.subscribe((data:any)=>{
      this.id    = data.id;
      this.nome  = data.nome;
      this.email = data.email;
      this.cpf   = data.cpf;
      this.senha = data.senha;
      this.nivel = data.nivel;
    });
  }

  async mensagemSucesso() {
    const toast = await this.toastController.create({
      message: 'Sucesso ao criar usuario',
      duration: 2000,
      color: 'success'
    })
    toast.present();
  }

  async mensagemErro() {
    const toast = await this.toastController.create({
      message: 'Erro ao criar usuario',
      duration: 2000,
      color: 'danger'
    })
    toast.present();
  }

  usuarios(){
    this.router.navigate(['usuarios']);
  }

  cadastrar() {
    return new Promise(resolve => {
      let dados = {
        nome: this.nome,
        cpf:  this.cpf,
        email: this.email,
        senha: this.senha,
        nivel: this.nivel
      }
      this.provider.dadosApi(dados, 'index.php?q=cadastrar').subscribe(
        (data:any)=>{

          if(data['status'] == 200)
          {
            this.router.navigate(['usuarios']);
            this.mensagemSucesso();
          }
          else
          {
            this.router.navigate(['usuarios']);
            this.mensagemErro();
          }
        }
      );
    });

  }

  editar(id:any, nome:string, cpf:string, email:string, senha:string, nivel:string) {
    return new Promise(resolve => {
      let dados = {
        nome: nome,
        cpf:  cpf,
        email: email,
        senha: senha,
        nivel: nivel,
        id: id
      }
      this.provider.dadosApi(dados, 'index.php?q=editar&v=' + id).subscribe(
        (data:any)=>{
          this.router.navigate(['usuarios']);
        }
      );
    });
  }

}
