import UserModel from "./models/UserModel.js";
import { hashPassword } from "./helper/helper.js";
import jwt from "jsonwebtoken";

const setupRoutes = (app) => {

    app.get('/users' , async(req, res) => {
        const token = req.headers.authorization;

        try {
            if(!token){
                res.statusCode = 401;
                res.send('You Have No Permisson !!!')
            } else {
                const decodedToken = jwt.decode(token)
                const user = await UserModel.findById(decodedToken.sub)
                jwt.verify(token, user.salt)
    
                if (!user) {
                    res.statusCode = 401;
                    res.send('You Have No Permisson !!!');
                } else {
                    const users = await UserModel.find({});
    
                    res.json(users);
                }
            }
        } catch (error) {
            res.send(error.message)
        }
    });

    app.post('/register' , async(req, res) => {
        const {username, email, password} = req.body;

        const user = await UserModel.findOne({email});

        if (!user) {
            const newUser = new UserModel({
                username,
                email,
                password
            });

            await newUser.save();
            res.send(newUser);
        } else {
            res.send("User Already Exist !!!")
        }
    });

    app.post('/login', async(req, res) => {
        const { email, password } = req.body;

        const user = await UserModel.findOne({email});

        if(!user){
            res.send("User NOT Found!!!");
        } else {
            if (user.password != hashPassword(password, user.salt)) {
                res.send('bad passowrd');
            } else {
                const token = jwt.sign({sub: user._id}, user.salt, {expiresIn: 18000000})
                res.header('auth-token', token);
                res.send('You are Logged In !!!')
            }
        }
    });

    app.listen(4000, () => console.log('server is running on port 4000'));
}

export default setupRoutes;