import { Router } from "express";
import passport from "passport";

const sessionRouter = Router()

sessionRouter.get('/', (req, res) => {
    res.render("templates/login", {
        css: 'loginRegistro.css'
    })
})

sessionRouter.get('/registroForm', (req, res) => {
    res.render("templates/register", {
        css: 'loginRegistro.css'
    })
})

sessionRouter.get('/login', passport.authenticate('login'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Usuario o contraseña no válidos")
        }

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        
        res.status(200).send("Usuario logueado correctamente")

    } catch (error) {
        res.status(500).send("Error al loguear usuario")
    }
})

sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send("Usuario ya existente en la aplicación")
        } 

        res.status(200).send("Usuario creado correctamente")

    } catch (error) {
        res.status(500).send("Error al registrar usuario")
    }
})

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { r })

sessionRouter.get('/githubSession', passport.authenticate('github'), async (req, res) => {
    console.log(req)
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/')
})

sessionRouter.get('/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send("Usuario logueado");
    } else {
        res.status(401).send("Usuario no autenticado");
    }
});

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(function (e) {
        if (e) {
            console.log(e)
        } else {
            res.status(200).redirect("/")
        }
    })
})

export default sessionRouter;