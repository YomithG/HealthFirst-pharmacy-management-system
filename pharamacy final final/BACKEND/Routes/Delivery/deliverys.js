//create part (routes)


const router = require("express").Router();
const oDetailsModel = require("../../Models/Product/oDetailsModel");
let Delivery = require("../../models/Delivery/delivery");


router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const contactNumber = Number(req.body.contactNumber);
    const address = req.body.address;
    const city = req.body.city;
    const amount = Number(req.body.amount);
    const fee = Number(req.body.fee); 

    const rider = req.body.rider;
    const status = req.body.status;

    const total = req.body.total;

    const newDelivery = new Delivery({
        name,
        contactNumber,
        address,
        city,
        amount,
        fee,
        rider,
        status,
        total
    });

    newDelivery.save().then(()=>{
        res.json("Delivery arranged");
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: "Failed to arrange delivery" });
    });
});


//getting all records 
router.route("/").get((req,res)=>{
    Delivery.find().then((deliverys)=>{
        res.json(deliverys)
    }).catch((err)=>{
        console.log(err) 
})
})


router.route("/orders").get(async (req, res)=> {
    try {
        const orders = await oDetailsModel.find({}, '_id');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});




router.route("/orders/1").get((req, res)=> {
    const orders = 
        {
          iid: 1,
          name: "pubudu",
          address: "nugegeoda",
          city: "kaduwela",
          contactNumber: "0765432190",
          amount: 7500
        };
    res.json(orders);
})

//update part
router.route("/update/:id").put(async(req,res)=>{
    let orderid = req.params.id   
    const {status} = req.body;

  const updateDelivery = {
    status
  } 


  const update = await Delivery.findByIdAndUpdate(orderid,updateDelivery).then(() =>{
    
    res.status(200).send({status: "Delivery progress updated"})  
}).catch((err) => { 

    console.log(err);
    res.status(500).send({status: "Error with updating data ",error: err.message });
})

  })         // to determine where to update we use id .so,:id to find that

//delete 

router.route("/delete/:id").delete(async(req,res)=>{
    let orderid=req.params.id 

    await Delivery.findByIdAndDelete(orderid).then(() =>{
    
        res.status(200).send({status: "Delivery record deleted"})  
    }).catch((err) => { 
    
        console.log(err);
        res.status(500).send({status: "Error with deleting data ",error: err.message });
    })

})

//getting one delivery record
router.route("/get/:id").get(async(req,res)=>{
    let orderid=req.params.id 

    const order = await Delivery.findById(orderid).then((order) =>{
    
        res.status(200).send({status: "Delivery fetched", order})  
    }).catch((err) => { 
    
        console.log(err);
        res.status(500).send({status: "Error with get delivery data ",error: err.message });
    })

})


 


module.exports = router;








