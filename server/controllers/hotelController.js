import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import { err } from "inngest/types";

export const registerHotel = async(req, res)=>{
    try {
        const {name, address, contact, city} = req.body;
        const owner = user._id;

        //check if user is already registered
        const hotel = await Hotel.findOne({owner});

        if (hotel) {
            return res.json({success: false, message: "Hotel Already Registered!"})
        }

        await Hotel.create({name, address, contact, city});
        await User.findByIdAndUpdate(owner, {role: "hotel owner"});

        res.json({success: true, message: "Hotel registered successfully!"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}