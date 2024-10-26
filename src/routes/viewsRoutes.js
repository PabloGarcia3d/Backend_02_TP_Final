import { Router } from "express";
const router = Router(); 

router.get("/login", (req, res) => {
    res.render("loginView"); 
})

router.get("/register", (req, res) => {
    res.render("registerView"); 
})


export default router; 