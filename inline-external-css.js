/**
 * Inlining external css-files in dom-module, to share style
 */

const fs = require('fs');
const path = require('path');
const args = process.argv;

console.log('Inlining external css-files in dom-module, to share style ...');

if (args.length < 4) {
  console.info('Input or output is missing')
  process.exit();
}

const input = args[2], output = args[3];

fs.readFile(input, (err, data) => {
  if (err) {
    console.error(`Error reading "${input}",\n err`);
    process.exit();
  }
  const content = `
    <dom-module id="${path.parse(output).name}">
      /* automatic inlined css-file "${input}" */
      <template>
        <style>
          ${data}
        </style>
      </template>
    </dom-module>
  `;
  fs.writeFile(output, content, (err) => {
    if (err) {
      console.error(`Error writing "${output}",\n err`);
      process.exit();
    }
    console.info('... successfully finished!')
  })
});
