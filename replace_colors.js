const fs = require('fs');
const files = ['style.css', 'index.html', 'vajdhata.html', 'script.js'];

// The new Vajdhata color logic based on the logo
// Base Gold: #D3A75B (approx 211, 167, 91)
// Accent Saffron/Orange: #FF8800 (approx 255, 136, 0)
// Accent Crimson/Red: #FF2E63 (approx 255, 46, 99)
// Accent Bronze: #A77334 (approx 167, 115, 52) 
// Deep Blue/Black bg

const replacements = [
    { from: /0,\s*245,\s*212/g, to: '211,167,91' }, // Cyan -> Gold
    { from: /#00f5d4/g, to: '#D3A75B' },
    
    { from: /157,\s*78,\s*221/g, to: '255,136,0' }, // Purple -> Orange
    { from: /#9d4edd/g, to: '#FF8800' },
    
    { from: /201,\s*123,\s*255/g, to: '255,136,0' }, // Purple 2 -> Orange
    { from: /#c97bff/g, to: '#FF8800' },
    
    { from: /57,\s*255,\s*133/g, to: '167,115,52' }, // Green -> Bronze
    { from: /#39ff85/g, to: '#A77334' },
    
    { from: /212,\s*175,\s*55/g, to: '228,186,115' }, // Gold stays but updated 
    { from: /#d4af37/g, to: '#E4BA73' },
    
    { from: /255,\s*179,\s*71/g, to: '228,186,115' }, // Gold 2
    { from: /#ffb347/g, to: '#E4BA73' },
    
    { from: /92,\s*107,\s*255/g, to: '255,46,99' }, // Indigo -> Crimson
    { from: /#5c6bff/g, to: '#FF2E63' },
    
    // Change background to purely black to match the logo `#000000`
    { from: /#040408/g, to: '#000000' },
    { from: /rgba\(4,4,8/g, to: 'rgba(0,0,0' }
];

files.forEach(f => {
    if(fs.existsSync(f)) {
        let c = fs.readFileSync(f, 'utf8');
        replacements.forEach(r => {
            c = c.replace(r.from, r.to);
        });
        fs.writeFileSync(f, c);
    }
});
console.log("Color palette updated.");
