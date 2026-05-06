const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
    try{
        const {name,email,password,role,bloodGroup,city} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({msg:"Please enter all required fields"});
        }

        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({msg:"User already exists"});

        const hashed = await bcrypt.hash(password,10);

        const user = await User.create({
            name,email,password:hashed,role,bloodGroup,city
        });

        return res.status(201).json({msg:"Registered successfully",user});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:err.message});
    }
};

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({msg:"Please enter email and password"});
        }

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"Invalid email or password"});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({msg:"Invalid email or password"});

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        return res.json({token,user});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:err.message});
    }
};
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({msg:"Please enter all fields"});
        }

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"User not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.json({
            msg:"Login success",
            token,
            user:{
                id:user._id,
                name:user.name,
                role:user.role
            }
        });

    }catch(err){
        res.status(500).json({error:err.message});
    }
}
