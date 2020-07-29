const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({"msg": "transaction api"});
});
router.post("/", );
router.patch("/:t_id",);
router.delete("/:t_id", );

module.exports = router;
