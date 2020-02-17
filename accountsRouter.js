const router = require("express").Router();

const db = require("./data/dbConfig");

router.get("/", (req, res) => {
  console.log(req.headers);
  db.select("*")
    .from("accounts")
    .limit(req.headers.limit)
    .orderBy(req.headers.order)
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Can't retrieve the data" });
    });
});

router.get("/:id", (req, res) => {
  getById(req.params.id)
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Can't retrieve the data" });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  db("accounts")
    .insert(req.body, "id") //will generate a warning on console when using sqlite, ignore it
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to add the account" });
    });
});

router.put("/:id", (req, res) => {
  //update a post
  const id = req.params.id;
  const changes = req.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Failed to update the account" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id }) // remember to filter or all records will be updated
    .del() //could be partial changes
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete the post" });
    });
});

function getById(id) {
  return db("accounts")
    .where({ id })
    .first();
}

module.exports = router;
