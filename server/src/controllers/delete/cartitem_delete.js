let {app} = require("../../app.js")
let cartitemModel = require("../../model/cartitem.model.js")





app.post('/cartitem/remove', async (req, res) => {
    const { userid, id } = req.body;
    console.log("Remove Request:", req.body);
  
    try {
      const item = await cartitemModel.findOne({ userid: userid, _id: id });
  
      if (!item) {
        return res.json({ success: false, message: "Item not found" });
      }
  
      if (item.quantity > 1) {
        // Decrease quantity by 1
        item.quantity -= 1;
        await item.save();
        return res.json({ success: true, message: "Quantity decreased", data: item });
      } else {
        // Quantity is 1, delete the item
        await cartitemModel.deleteOne({ _id: item._id });
        return res.json({ success: true, message: "Item removed from cart", data: item });
      }
    } catch (error) {
      console.error("Error removing item", error);
      res.status(500).json({ success: false, message: "Failed to remove item" });
    }
  });
  