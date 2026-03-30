const fs = require('fs');
const files = ['index.html', 'vajdhata.html', 'style.css', 'script.js', 'package.json'];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let c = fs.readFileSync(f, 'utf8');
        c = c.replace(/Quantix/g, 'Vajdhata')
             .replace(/quantix/g, 'vajdhata')
             .replace(/Aurem/g, 'Auremous')
             .replace(/aurem/g, 'auremous')
             .replace(/AUREM/g, 'AUREMOUS');
             
        fs.writeFileSync(f, c);
    }
});

if (fs.existsSync('quantix.html')) {
    fs.renameSync('quantix.html', 'vajdhata.html');
}

console.log("Renamed text successfully.");
