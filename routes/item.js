const express = require('express');
const multer = require('multer');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/items', auth, async (req, res) => {
  const item = new Item({
    ...req.body
  });

  try {
    await item.save();
    res.status(200).send(item);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (e) {
    res.send();
  }
});

router.get('/items/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const item = await Item.findOne({ _id });
    if (!item) {
      return res.status(400).send();
    }

    res.send(item);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/items/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const item = await Item.findOne({ _id: req.params.id });

    if (!item) {
      return res.status(400).send();
    }
    updates.forEach(update => (item[update] = req.body[update]));
    await item.save();
    res.send(item);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/items/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id });
    if (!item) {
      return res.status(404).send();
    }

<<<<<<< HEAD
    res.send(`${item.name} has been deleted.`);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
=======
const upload = multer({
  limits: {
    fileSize: 1000000
  },
    fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload a picture'))
        }
        cb(undefined, true)
    }
})



module.exports = router
>>>>>>> d2dc57f4d5b5a13aca2983958425ef891e64a25f
