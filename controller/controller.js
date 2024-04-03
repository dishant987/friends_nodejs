import Friends from "../model/friendsSchema.js";

export const insertdata = async (req, res) => {
  try {
    const { name, date, mobile } = req.body;

    const formatdate = new Date(date);

    const newFriend = new Friends({
      name: name,
      date: formatdate,
      mobilenum: mobile,
    });

    await newFriend
      .save()
      .then((done) => {
        res.json({ success: "Data Added" });
      })
      .catch((error) => {
        // res.json({ error });
        if (error.code === 11000 && error.keyPattern.name) {
          res.json({ code: 400, message: "Name already exists" });
        }
        if (error.code === 11000 && error.keyPattern.mobilenum) {
          res.json({ code: 400, message: "MobileNumber already exists" });
        }
        if (error.errors.mobilenum.kind === "user defined") {
          res.json({ mobval: error.errors.mobilenum.message });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (req, res) => {
  try {
    const data = await Friends.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (req,res)=>{
    try {
        const data = await Friends.findByIdAndDelete(req.params.id)
        res.json({ message: 'Deleted successfully', data });
    } catch (error) {
        console.log(error);
    }
}

export const getIdData = async (req,res)=>{
  try {
    const data = await Friends.findById(req.params.id)
    res.json({data})
  } catch (error) {
    console.log(error);
  }
}

export const updateFriendById = async (req,res)=>{
  try {
    const {id,name,date,mobile} = req.body
    const data = await Friends.findByIdAndUpdate(id,{
      name:name,
      date:date,
      mobilenum:mobile
    }).then(()=>{
      res.json({success:"updated successfull"})
    })

  } catch (error) {
    if (error.code === 11000 && error.keyPattern.name) {
      res.json({ code: 400, message: "Name already exists" });
    }
    if (error.code === 11000 && error.keyPattern.mobilenum) {
      res.json({ code: 400, message: "MobileNumber already exists" });
    }
  }
}
