const fs = require('fs');
const files = ['index.html', 'quantix.html', 'style.css', 'script.js', 'package.json'];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let c = fs.readFileSync(f, 'utf8');
        c = c.replace(/Quantix/g, 'Vajdhata')
             .replace(/quantix/g, 'vajdhata')
             .replace(/QUANTIX/g, 'VAJDHATA');
             
        fs.writeFileSync(f, c);
    }
});

if (fs.existsSync('quantix.html')) {
    fs.renameSync('quantix.html', 'vajdhata.html');
}

console.log("Renamed text successfully.");
