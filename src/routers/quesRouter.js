const express = require('express');
const router = express.Router();
const path = require('path');
const QuesModel = require('../models/quesModel');
const hbs = require('hbs')
router.use(express.static(path.resolve('./public')));

router.post('/uploadQues', async (req, res) => {
    try {
      const { siteName, siteUrl, quesHtml, timestamp } = req.body;

      const newData = new QuesModel({
        siteName,
        siteUrl,
        quesHtml,
        timestamp,
      });

      await newData.save();
      res.status(200).json({ message: 'Data uploaded successfully' });
    } catch (error) {
      console.error('Error while uploading data:', error);
      res.status(500).json({ message: 'Failed to upload data' });
    }
  });


  router.get("/ques", async (req, res)=>{
    try{
      const page = parseInt(req.query.page) || 1; 
    const itemsPerPage = parseInt(req.query.limit) || 5;
  
    const count = await QuesModel.countDocuments(); 
      const totalPages = Math.ceil(count / itemsPerPage);
      const skip = (page - 1) * itemsPerPage;
  
      const latestData = await QuesModel.find()
        .sort({ timestamp: -1})
        .skip(skip)
        .limit(itemsPerPage)
        .select('siteName siteUrl _id timestamp');
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    if(pageNumbers.length>5) pageNumbers.length=5; 
  
    const pagination = {
      current: parseInt(page),
      totalPages
    };
  
    res.render('index', { data: latestData, pagination, pageNumbers});
    }catch(error){
      res.send(error.message);
    }
  })

  router.get("/ques/:id", async (req, res)=>{
    try{
      const _id = req.params.id;
      const data = await QuesModel.findById(_id);

      res.send(data.quesHtml);

    }catch(error){
      res.send(error.message);
    }
  })


  module.exports = router;