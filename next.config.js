const path = require('path')

const createMDX = require('@next/mdx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  sassOptions: {
    includePaths: [path.join(__dirname, "src/app")],
  },
  output: 'export'
}

const withMdx = createMDX({
  // Any additional MDX config should go here
})

module.exports = withMdx(nextConfig)
