const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  sassOptions: {
    includePaths: [path.join(__dirname, "src/app")],
  },
  output: 'export'
}

module.exports = nextConfig
