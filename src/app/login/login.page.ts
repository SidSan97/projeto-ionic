import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  senha: string = "";

  constructor(
    private router:Router,
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController
    ) { }


  ngOnInit() {
  }

  async mensagemSucesso(msg:string) {
    const toast = await this.toastController.create({
      message: 'Logado com sucesso ' + msg,
      duration: 2000,
      color: 'success'
    })
    toast.present();
  }

  async mensagemErro() {
    const toast = await this.toastController.create({
      message: 'Erro ao fazer login. Usuario ou senha incorreto',
      duration: 2000,
      color: 'danger'
    })
    toast.present();
  }

  login() {
    /*return new Promise(resolve => {
      let dados = {
        usuario:  this.usuario,
        senha: this.senha,
      }
      this.provider.dadosApi(dados, 'index.php?q=login').subscribe(
        (data:any)=>{

          if(data['status'] == 200)
          {
            let a = data.dados;
            this.mensagemSucesso(a['nome']);
            this.router.navigate(['folder']);
          }
          else
          {
            this.mensagemErro();
          }
        }
      );
    });*/

  }

}
