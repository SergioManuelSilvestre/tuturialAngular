
// acesso À base de dados
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// esquema da base de dados
const Schema = mongoose.Schema;

// encriptação da password npm bcrypt-nodejs --save
const bcrypt = require ('bcrypt-nodejs');


/// funçoes para verificar que o user name e email nao são salvos em vazio null

let emailVerificador = (email) => {

  if (!email){
    return false;


  }else {
    if (email.length < 5 || email.length > 30) {
      return false;

    } else {

      return true;
    }

  } 
  
};

// validar o formato de email

let validoEmailChecker = (email) => {

  if (!email){
    return false
  } else {
      // variavel que recebe o metodo RegExp() para validar formato de email

      const regExp = new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ); 

      return regExp.test(email);

  }
};

// objeto array para userschema 

const emailValidator = [
{
  validator: emailVerificador, message: 'o email tem de ter mais de cinco caracteres e menos de trinta'
},

{
  validator: validoEmailChecker,
  message: ' O email deve ser escrito no formato correcto '


}

];


// validador para username

let usernameLengthChecker = function (username) {

  if (!username){
    return false;
  } else {
    if (username.length < 3 || username.length > 15) {
      return false;
    } else{
        return true;
    }
  }
};


let validUsername = (username)=>{

  if (!username){

    return false;
  } else {

    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
}


const usernameValidators = [
  // First Username validator
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15'
  },
  // Second username validator
  {
    validator: validUsername,
    message: 'username não pode conter espaços em branco ou caracteres especiais'

  }
 
];

// validator para password

let passwordTamanho = (password)=> {

  if(!password) {
    return false;

  } else {
    if (password.length < 8 || password.length > 35){
      return false;
    } else{
      return true;
    }
  }

};

let passwordRegex = (password)=>{

    if(!password){
      return false;
    }else{
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      return regExp.test(password);
    }
};

const passwordValidator = [

  {
    validator: passwordTamanho,
    message: ' a password deve conter no minimo 8 caracteres e no máximo 35'
  },
  {
    validator: passwordRegex,
    message: 'A password Deve conter um uppercase, lowercase, caracter especial e numero'
  }

];


// User Model Definition
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidator},
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
  password: { type: String, required: true, validate: passwordValidator  }
});


// midleware que ocorre antes do userSchema ser salvo
// encripta a password
// .pre('save') - antes de criar o schema

userSchema.pre('save', function (next){

    if(!this.isModified('password')) 
      return next();
    // para o midleware nao correr se a password nao for alterada
    bcrypt.hash(this.password,null,null, (err, hash) =>{
      if(err) {
        console.log('erro do bcrypt has password ./models/user.js');
        console.log(err);

        return next(err);

      } 
      //else
      this.password = hash; /// faz a encryptação da password
      next();
    })
});

// desincriptar a password para comparação

  userSchema.methods.compararPassword = (password) => {

    return bcrypt.compareSync(password, this.password);
  }


// Export Module/Schema
module.exports = mongoose.model('User', userSchema);

// exports
/** 
 * Procurar statics para criar um valor a exportar
 * http://mongoosejs.com/docs/guide.html
 * 
 * var Animal = mongoose.model('Animal', animalSchema);
 * em vez de uma variavel exporta-se o valor
 */


   // *****desnecessário para este modelo********
 /* Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo
 title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
*/  

