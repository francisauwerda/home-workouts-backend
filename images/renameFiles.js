const fs = require('fs');
const files = fs.readdirSync(__dirname);

let counter = 0;
for (const file of files) {
  if (file.endsWith('.png')) {
    console.log('\n---\n file:\n', file, '\n---');
    fs.rename(
      `${__dirname}/${file}`,
      // `${__dirname}/${file.replace('.png', '')}-test.png`,
      `${__dirname}/${counter}.png`,
      err => {
        if (err) {
          console.log('\n---\n err:\n', err, '\n---');
        }
      }
    )
    counter += 1;
  }
}