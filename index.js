const express = require('express')
const query = require('samp-query-info')
const app = express()

app.get('/lex/samp', function (req, res) {
    const ip = req.query.ip;
    const port = req.query.port;
    const Serverip = `${ip}:${port}`;
    var options = {
        host: ip,
        port: port
    };
    query(options, function (error, response) {
        if(error){
            res.status(404).json({'error': 'Something Went Wrong Please Check ip And port correcly or Please Try Again Later'})}
        else{
        function createStrList(arr) {
        const indexLen = Math.floor(Math.log10(arr.length - 1)) + 1;
         let nameLen = 0;

        for (const item of arr) {
        if (item.name.length > nameLen) nameLen = item.name.length;
    }

        return arr.map((x, i) => [`${i}${" ".repeat(indexLen - `${i}`.length)} ${x.name}${" ".repeat(nameLen - x.name.length)} ${x.score}  ${x.ping}`]).slice(0,11).join("\n");
}
let Players = (createStrList(response['playerlist']));
res.json({'response':{'serverip': Serverip, 'address': ip,'hostname': response["servername"],'gamemode': response["gamemodename"],'language': response["language"],'passworded': response["passworded"],'maxplayers': response["maxplayers"],'isPlayerOnline': response["players"],'properties': {'lagcomp': response["lagcomp"],'mapname': response["mapname"],'version': response["version"],'weather': response["weather"],'weburl': response["weburl"],'worldtime': response["worldtime"]},'isPlayersIngame': Players}})}
   
        })
})

app.get('*', function(req, res){
    res.status(404).json({'404': 'Not Found! Enter IP AND PORT'});
  });

const PORT = process.env.PORT || 7006;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
