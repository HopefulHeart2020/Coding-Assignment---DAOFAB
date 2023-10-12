const express = require('express');
const router = express.Router();
const Tcontroller=require('../controllers/transactionController');

router.get('/parent/counter', Tcontroller.get_counter)
router.get('/parent/page=:number', Tcontroller.get_transaction);
router.get('/parent/detail=:number', Tcontroller.get_detail);

module.exports=router;