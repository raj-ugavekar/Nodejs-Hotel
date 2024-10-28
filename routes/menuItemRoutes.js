const express = require("express");

const MenuItem = require("../Models/MenuItems");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    const response = await newMenuItem.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could Fetch Data" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could Fetch Data" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "Sweet" || tasteType == "Sour" || tasteType == "Spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Taste Type" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could Fetch Data" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const menuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, menuData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({ error: "MenuItem not Found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could not be Updated" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete({ _id: menuId });
    if (!response) {
      res.status(404).json({ error: "MenuItem not Found" });
    }
    res.status(200).json({ Message: "Menu Item Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could not be Deleted" });
  }
});

module.exports = router;
