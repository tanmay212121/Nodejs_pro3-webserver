const request = require("request")

const forecast = (lattitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=fc429c6175e9b3056db7d1a83a00296f&query=${lattitude},${longitude}`
    //  const url = "http://api.weatherstack.com/current?access_key=fc429c6175e9b3056db7d1a83a00296f&query=20.26444,85.82806"


    request({url:url,json:true},(error,response)=>{
        if(error){
                    callback('unable to connect',undefined)
                }
                else if(response.body.error){
                    callback('check the lattitude and longitude',undefined)
                }
                else{
                   callback(undefined,response.body.current.temperature)
                }
    })
}

module.exports = forecast