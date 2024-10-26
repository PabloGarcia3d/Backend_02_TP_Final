import express from "express";
import { engine } from "express-handlebars";
import "./database/data_base_conect.js";
import passport from "passport";
import cookieParser from "cookie-parser"
import usersRouter from "./routes/usersRoutes.js";
import viewsRouter from "./routes/viewsRoutes.js"; 
import initializePassport from "./config_passport/passport.config.js";



const app = express();
const PORT = 3000;



//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize()); 
initializePassport(); 


//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter); 
app.use("/api/sessions", usersRouter); 


app.listen(PORT, ()=>{
    console.log("Servidor escuchando en el puerto " + PORT)
})










