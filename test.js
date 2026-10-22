const assert = require('assert');
const { generateMarkdownTable } = require('./app.js');
console.log('🧪 Testing Table Forge...');
const res = generateMarkdownTable(['A', 'B'], [['1', '2']]);
assert(res.includes('| A | B |'), 'Header formatted');
assert(res.includes('| --- | --- |'), 'Divider formatted');
console.log('✅ Table Forge test passed!');
