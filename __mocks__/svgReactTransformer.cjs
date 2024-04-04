const svgr = require('@svgr/core').default;
const { readFileSync } = require('fs');

module.exports = {
    process(src, filename) {
        const source = readFileSync(filename, 'utf8');
        const jsCode = svgr.sync(source, { react: true }, { filePath: filename });
        return jsCode;
    },
};
