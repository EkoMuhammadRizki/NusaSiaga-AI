const fs = require('fs');
const https = require('https');
const url = "https://raw.githubusercontent.com/ans-4175/peta-indonesia-geojson/master/indonesia-prov.geojson";
https.get(url, (res) => {
  const file = fs.createWriteStream("d:\\NusaSiaga AI\\public\\indonesia.json");
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log("Download completed");
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
