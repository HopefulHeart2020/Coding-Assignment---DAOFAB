const express = require('express');
const router = express.Router();
const Tcontroller=require('../controllers/transactionController');

router.get('/parent/page=:number', Tcontroller.get_transaction);
router.get('/child/parent=:pid', Tcontroller.get_child);

module.exports=router;