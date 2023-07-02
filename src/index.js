const express = require('express');
const app = express();
require('dotenv').config();
require('./db/conn')
const cron = require('node-cron');
const path = require('path');
const hbs = require('hbs')
const helpers = require('./helper/helper');
app.use(express.urlencoded({ extended: true }));
const port= process.env.PORT || 3000;
const dataRoute = require('./routers/quesRouter');
app.use('/api', dataRoute);

app.use(express.static(path.resolve('./public')));
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.send("hii");
});


cron.schedule('*/14 * * * *', () => {
  //console.log('running a task every 14 minutes');
  try {
    request.get('https://inductions2022.onrender.com/test', (error, response, body)=>{
      console.log(body);
    });
  } catch (error) {
    console.log(error);
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
