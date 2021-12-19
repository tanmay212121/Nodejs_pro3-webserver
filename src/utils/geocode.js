const request = require("request")


const geocode = (address,callback)=>{

    const mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +address+ ".json?types=place&access_token=pk.eyJ1Ijoicm9ueTQ3MDYiLCJhIjoiY2tmaHMxMGE1MG51cDJ5bXMxOGQzZWF6cSJ9.u7Kbz9nO9--xdcP0oWas-A"
     request({url:mapboxURL,json:true},(error,response)=>{
         if(error){
             callback("unable to connect",undefined)
 
         }else if(response.body.features.length === 0){
             callback("unable to find location",undefined)
 
         }else{
             callback(undefined,{
                 latitude:response.body.features[0].geometry.coordinates[1],
                 longitude:response.body.features[0].geometry.coordinates[0],
                 location:response.body.features[0].place_name
             })
         }
     })
 }

 module.exports = geocode