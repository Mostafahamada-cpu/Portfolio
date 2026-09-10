/* Run `node generate-project-assets.js` after adding screenshots to a project folder. */
const fs = require('fs');
const path = require('path');

const roots = {
  memora: 'Memora',
  crm: 'CRM',
  'attendance-app': 'Attendance',
  clientview: 'RingRoad',
  stancepro: 'StancePro',
  'money-tracker': 'MoneyTracker',
  'to-do': 'ToDoList',
  'aion-web': 'AION(Wuillt)',
  'aion-store': 'AION(Wuillt)'
};
const imagePattern = /\.(png|jpe?g|webp|gif|svg)$/i;

function imagesIn(folder) {
  return fs.readdirSync(folder, { withFileTypes: true })
    .flatMap(entry => {
      const itemPath = path.join(folder, entry.name);
      if (entry.isDirectory()) return imagesIn(itemPath);
      return imagePattern.test(entry.name) ? [itemPath.split(path.sep).join('/')] : [];
    });
}

const assets = Object.fromEntries(Object.entries(roots).map(([id, folder]) => [id, imagesIn(folder)]));
const output = `// Generated from project folders. Do not edit image paths manually.\nwindow.portfolioProjectAssets = ${JSON.stringify(assets, null, 2)};\n`;
fs.writeFileSync('project-assets.generated.js', output);
