const express = require("express");
const Person = require("../Models/Person");

const router = express.Router();

const { jwtAuthMiddleware, generateToken } = require("./../jwt");

router.post("/signup", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const response = await newPerson.save();
    console.log("Data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);

    res.status(200).send({ response, token });
  } catch (error) {
    res.status(500).send("Internal Error Could Save Data");
    console.log("Data not saved", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could Fetch Data" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userid = userData.id;

    const user = await Person.findById(userid);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work;
    if (workType == "Chef" || workType == "Waiter" || workType == "Manager") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could Fetch Data" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personData = req.body;

    const response = await Person.findByIdAndUpdate(personId, personData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Error Could Fetch Data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete({ _id: personId });
    if (!response) {
      res.status(404).json({ error: "Person not Found" });
    }
    res.status(200).json({ Message: "Person deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error Could not Delete" });
  }
});

module.exports = router;
