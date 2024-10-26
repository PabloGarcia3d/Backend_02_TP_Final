import { Router } from "express";
const router = Router(); 
import UserModel from "../database/models/userModel.js";
import jwt from "jsonwebtoken"; 
import passport from "passport";
import { createHash, isValidPassword } from "../utils/utils.js";



//Ruta del Registro: 

router.post("/register", async (req, res) => {
    
    
    let {first_name, last_name, email, age, password, role} = req.body; 
  // console.log(req.body)

    try {
        
        //Verifico si existe el usuario
        const existUser = await UserModel.findOne({email}); 

        if (existUser) {
            return res.status(400).send("El usuario existe en la base de datos");
        }


        // Sino existe creo uno nuevo
        const newUser = new UserModel({
            first_name,
            last_name, 
            email,
            age, 
            password: createHash(password),
            role
        });
        
        await newUser.save(); 
/*
Aca puedo generar un token y una cookie y loguear directamente.
        //Creo el token 

        const token = jwt.sign({user: newUser.email}, "coder", {expiresIn: "2h"}); 

        //Creo la cookie
        res.cookie("userTokenCookie", token, {
            maxAge: 8000000, 
            httpOnly: true
        })
       
        res.render("registrado"); 
*/

//O puedo enviar al login y generar el token y la cookie desde el login

res.render("loginView"); 


    } catch (error) {
        res.status(500).send("Error añ intentar registrarse"); 
    }
});


//Login: 

router.post("/login", async (req, res) => {
    let {email, password} = req.body; 
    //console.log(req.body)

    try {
        //Busco el usuario en la bbd
        const existUser = await UserModel.findOne({email}); 

        if (!existUser) {
            return res.status(401).send("El usuario no esta registrado"); 
        }

        // Verifico el pass
        if(!isValidPassword(password, existUser)) {
            return res.status(401).send("La contraseña no es valida"); 
        }

         //Generar el token JWT
         const token = jwt.sign({email: existUser.email, role: existUser.role}, "coder", {expiresIn: "2h"}); 

         //Creo la cokkie
         res.cookie("userTokenCookie", token, {
             maxAge: 8000000, 
             httpOnly: true
         })
 
         res.render("logueadoView"); 


    } catch (error) {
        res.status(500).send("Error al intentar logguearse"); 
    }
})


// Aca autentico con passport con la estrategia current ( que valida solo que existe y sea correcto el el JWT)
router.get("/current", passport.authenticate("current", {session: false}), (req, res) => {
    
    //el req.user viene con la data guardada en el token
    //console.log(req.user)


    res.render("homeView", {email: req.user.email}); 
})

// Creo la ruta de logout
router.post("/logout", (req, res) => {
    //Limpiamos la cookie 
    res.clearCookie("userTokenCookie"); 
    res.redirect("/login"); 
})

/*
//Aca genero una ruta admin con control de roles

router.get("/admin", passport.authenticate("current", {session: false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado, no posse el rol necesario para ingresar"); 
    }

    //Si el usuario es admin muestra la ruta que tiene que mostrar
    res.render("admin");
})

*/

export default router; 


