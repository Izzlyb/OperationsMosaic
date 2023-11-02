import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import KPI from "../models/KPI.js";

export const getAdmins = async (req, res ) => {

  try {
    const admins = await User.find({ role: "admin"  }).select("-password");

    console.log('>>>getting admin users <<<');
    console.log(admins);

    res.status(200).json(admins);

  } catch ( error ) {
    res.status(404).json({message: error.message});
  }

}

export const getUserPerformance = async (req, res ) => {

  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from : "affiliatestats", 
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      {
        $unwind: "$affiliateStats"
      }
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filterdSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null 
    )

    console.log('>>>getting users with stats <<<');
    console.log(userWithStats);
    console.log('>>>getting filtered sales transactions <<<');
    console.log(filterdSaleTransactions);


    res.status(200).json({ user: userWithStats[0], sales: filterdSaleTransactions });

  } catch ( error ) {
    res.status(404).json({message: error.message});
  }

}

export const getKpis = async (req, res ) => {

  try {
    const kpis = await KPI.find();

    console.log('>>>getting Kpis<<<');
    console.log();

    res.status(200).json(admins);

  } catch ( error ) {
    res.status(404).json({message: error.message});
  }

}
