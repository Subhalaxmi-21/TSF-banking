const express=require("express")
const mongoose=require("mongoose")
const path = require('path')
const dotenv = require('dotenv').config()


const app = express()
app.use(express.json())
// Uncommented when exit code was 0
app.use(express.static(path.join(__dirname, "banking","build")))

try {
    // console.log("ENtered try")
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // console.log("verified")
  } catch(err) {
    console.log("hi")
    console.log('ERROR')
    
  }

app.use('/api/customers', require('./routes/customer'))
app.use('/api/transaction', require('./routes/Transaction'))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './banking', 'public', 'index.html'))
//   })
// ADded changes here
  
  const PORT = process.env.PORT || 3001
  if (process.env.NODE_ENV == "production"){
    app.use(express.static("banking/build"));
    app.get('*', (req, res) => {
      // instead of join resolve was there
      res.sendFile(path.join(__dirname, 'banking', 'build', 'index.html'))
    })
  }

  app.listen(PORT, () => console.log(`Server started at port ${PORT}`))