
const User = require('../models/user');

/*
import { Mongoose } from 'mongoose';
Mongoose.Promisse = global.Promise;

*/

// router vem do expressJS
// vai ser utilizado em index.js
/**
 * const authentication = require('./routes/authentication')(router);

 * app.use('/authentication',authentication); // ficheiro authentication

 */
module.exports = (router) => {

// post -- para enviar dados 
    router.post('/register', (req,res) =>{

        // rota para registo que conte,:
     /*   
        req.body.email
        req.body.username
        req.body.password
    */
        if(!req.body.email){ // https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

           
            res.json({success: false, message: ' é necessário escrever um email!! ', });
        } else {
            if(!req.body.username){
                res.json({success: false, message: ' é necessário escrever um username! ' });
             
            } else {

                if(!req.body.password) {
                    res.json({success: false, message: ' é necessário escrever uma password' });

                     } else { // fim do if else aninhado
                        
                        // ficheiro ./models/user.js para guardar novo utilizador
                        let user = new User({ // passar um objeto
                            email: req.body.email.toLowerCase(),
                            username: req.body.username.toLowerCase(),
                            password: req.body.password

                            // TALVEZ POSSAS INSERIR O TEMPO AQUI
                        });

                        console.log('resposta do ficheiro')
                        console.log(req.body);
                        console.log(user);
            
                     //   res.send('hello world ficheiro de autenticacao'); // teste de rota
                     //   user.save(); // para salvar user
                // salvar user com testes para saber se aconteceram erros       
                        user.save((err) => {
                            if(err){

                                if(err.code === 11000) {
                                    res.json ({success: false, message: 'Username e Email já existem tente outro'})
                                } else {

                                    if (err.errors){

                                        
                                        if (err.errors.email) {
                                            res.json({success:  false, message: err.errors.email.message });
                                        } else {
                                            if(err.errors.username){
                                                res.json({success:  false, message: err.errors.username.message });

                                            } else {
                                                if (err.errors.password) {
                                                    res.json({success:  false, message: err.errors.password.message });
                                                
                                                } else {
                                                    res.json({ success: false, message: err } ); 
                                                }
                                            }
                                        }
                                        
                                    } else {

                                        
                                    res.json({
                                        success: false,
                                        message: ' nao foi possivel salvar utilizador: Erro; ', err
                                     });

                                    }

                                }

                              
                                 console.log(err);

                            }else {
                                res.json({
                                    success: true,
                                    message: 'utilizador Salvo'

                                })
                            }
                        });
                }
            } 
        }
        
    });

    router.get('/checkEmail/:email', (req,res) => {

        if(!req.params.email) {
            res.json({ success: false, message: 'necessário escrever email' });

        } else {

            User.findOne({ email: req.params.email }, (err, user) => {

                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: ' Email já existe no registo'              })
                    } else {
                        res.json({ success: true, message: 'Email disponivel'})
                    }
                }
            });
           
        }
    });

    
    router.get('/checkUsername/:username', (req,res) =>{

        if(!req.params.username) {
            res.json({ success: false, message: 'necessário escrever username' });

        } else {

            User.findOne({ username: req.params.username }, (err, user) => {

                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: ' username já existe no registo'              })
                    } else {
                        res.json({ success: true, message: 'username disponivel'})
                    }
                }
            });
           
        }
    });
    
    return router;
}