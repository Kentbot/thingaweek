const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app")],
  },
  output: 'export'
}

module.exports = nextConfig
