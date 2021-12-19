const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
console.log(publicDirectoryPath)
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res,next)=>{
    res.render('index',{
        title:'Weather Application',
        author:'Created by Tanmay Nayak'
    })
})

app.get('/weather',(req,res,next)=>{

    if(!req.query.address){
        return res.send({
            error:'please provide the address to fetch weather details'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({
                error:'unable to connect to geocode api'
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:'unable to collect the forecast data of the given location'
                })
            }
            res.send({
                forecast:forecastData,
                address:req.query.address
            })
        })
    })
   
})

app.get('/about',(req,res,next)=>{
    res.render('about',{
        title:'Weather Application',
        author:'Created by Tanmay Nayak'
    })
})

app.get('/help',(req,res,next)=>{
    res.render('help',{
       helpText:'What can i help you?',
       author:'Created by Tanmay Nayak'
    })
})

app.get('/products',(req,res,next)=>{
    console.log(req.query)
})

app.get('*',(req,res)=>{
    res.send("my 404 page")

})

app.listen(3000,()=>{
    console.log("server got started!!")
})