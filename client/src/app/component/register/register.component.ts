import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    // necessário para formbuilder

  form123: FormGroup;
  message;
  messageclass;
  processing = false; // liga e desliga botao submit

// variaveis

  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;




  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.creatForm();

   }


  // funçao que cria um formulario

  creatForm() {

    this.form123 = this.formBuilder.group({

        // validators

        email: ['', Validators.compose([

          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          this.validarEmail

        ])],
        username:  ['', Validators.compose([

          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          this.validarUsername
        ])],
        password: ['', Validators.compose([

          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35),
          this.validarPassword
        ])],
        confirm: ['', Validators.required],
    }, {  validator: this.matchingPasswords('password', 'confirm') }); // esta FormBuild.grouip({dsf}, {dsfsdf })
  }



  // funçoes  para validar com regExp

  validarEmail(controls) {

  // tslint:disable-next-line:max-line-length
  const regExp = new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
  if (regExp.test(controls.value)) {
    return null;
    } else {
      return{ 'validarEmail': true };
   }
  }

  validarUsername (controls) {


   const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

   if ( regExp.test(controls.value)) {
     return null;
   } else {

    return { 'validarUsername': true };
   }
  }

  // funções para desligar o prenchimento do formolario
  // desativa a barra de edição de texto

  desativaFormolario() {
    this.form123.controls['email'].disable();
    this.form123.controls['username'].disable();
    this.form123.controls['password'].disable();
    this.form123.controls['confirm'].disable();
  }

  ativaFormolario() {
    this.form123.controls['email'].enable();
    this.form123.controls['username'].enable();
    this.form123.controls['password'].enable();
    this.form123.controls['confirm'].enable();
  }
  validarPassword (controls) {

    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);

    if (regExp.test(controls.value)) { return null;
     } else {
       return { 'validarPassword': true } ;
     }
  }


  matchingPasswords(password, confirm) {

    return ( group: FormGroup ) => {

      if (group.controls[password].value === group.controls[confirm].value) {

        return null;
      } else {
        return {'matchingPasswords': true };
      }
    };
}

  // funçao quando o formulário é submetido
  onRegisterSubmit() { // botao submit

      // variavel de controlo
      this.processing = true; // desliga botao
      this.desativaFormolario(); // corre a função para desligar o formulario

    const user = {

      email: this.form123.get('email').value,
      username: this.form123.get('username').value,
      password: this.form123.get('password').value,
    };

    // utiliza o ficheiro do seriço
    // envia os dados para authService
    this.authService.registerUser(user).subscribe(data => {


      // tslint:disable-next-line:one-line
      if (!data.success ){ // atencção success

        this.messageclass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.ativaFormolario();

      } else {

        this.messageclass = 'alert alert-success';
        this.message = data.message ;

        // CRIA UM FUNÇÃO TEMPORIZADOR

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

      }
      console.log(data);
      /**
       * porque estamos em modo de ng serve 4200
       * os dados não são enviados para o servidor
       * é necessário ativar cross-origin
       */

    });

    console.log(this.form123);


    console.log(this.form123.get('email').value);
    console.log(this.form123.get('username').value);
    console.log(this.form123.get('password').value);

    console.log('formulário submetido');
  }


    // verificar username

    checkEmail() {
/*
        const email = this.form123.get('email').value;
        this.authService.checkEmail(email).subscribe(data => {
*/
this.authService.checkEmail(this.form123.get('email').value).subscribe(data => {
          if (!data.success) {

              this.emailValid = false;
              this.emailMessage = data.message;


          } else {
            this.emailValid = true;
            this.emailMessage = data.message;
          }
        });

        // ou
        //   this.authService.checkEmail(this.form123.get('email').value);

    }
    checkUsername() {


      this.authService.checkUsername(this.form123.get('username').value).subscribe(data => {

        if (!data.success) {

            this.usernameValid = false;
            this.usernameMessage = data.message;


        } else {
          this.usernameValid = true;
          this.usernameMessage = data.message;
        }
      });

      // ou
      //   this.authService.checkEmail(this.form123.get('email').value);

  }


  ngOnInit() {
  }

}
