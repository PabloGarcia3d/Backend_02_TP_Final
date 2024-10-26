import mongoose from "mongoose";

mongoose.connect("mongodb+srv://pablogarcia:coder@cluster0.xgw51.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la Base de datos"))
    .catch( (error) => console.log("Error en la conexion a la base de datos", error))