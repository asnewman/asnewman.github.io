#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('Usage: node publish-post.js <markdown-file> <slug> <category> <description>');
  console.error('Example: node publish-post.js markdown/post.md mypost life "A short description"');
  process.exit(1);
}

const [markdownFile, slug, category, description] = args;

// Validate markdown file exists
if (!fs.existsSync(markdownFile)) {
  console.error(`Error: Markdown file not found: ${markdownFile}`);
  process.exit(1);
}

// Get absolute paths
const markdownPath = path.resolve(markdownFile);
const htmlFile = `${slug}.html`;
const rssFile = path.resolve('rss.xml');

console.log(`Converting markdown to HTML...`);
// Run convert-md.js and save to HTML file
try {
  const htmlOutput = execSync(`node convert-md.js "${markdownPath}"`, { encoding: 'utf8' });
  fs.writeFileSync(htmlFile, htmlOutput, 'utf8');
  console.log(`✓ Created ${htmlFile}`);
} catch (error) {
  console.error(`Error running convert-md.js: ${error.message}`);
  process.exit(1);
}

console.log(`Generating RSS item...`);
// Run rss-item.js to get RSS item
let rssItem;
try {
  rssItem = execSync(`node rss-item.js "${markdownPath}" "${slug}" "${category}" "${description}"`, { encoding: 'utf8' });
} catch (error) {
  console.error(`Error running rss-item.js: ${error.message}`);
  process.exit(1);
}

console.log(`Updating rss.xml...`);
// Read rss.xml
let rssContent;
try {
  rssContent = fs.readFileSync(rssFile, 'utf8');
} catch (error) {
  console.error(`Error reading rss.xml: ${error.message}`);
  process.exit(1);
}

// Find the position to insert the new item (right after </image> and before the first <item>)
// Look for the pattern: </image> followed by <item>
const imageEndPattern = /<\/image>\s*\n/;
const match = rssContent.match(imageEndPattern);
if (!match) {
  console.error('Error: Could not find </image> tag in rss.xml');
  process.exit(1);
}

const insertPosition = match.index + match[0].length;

// Insert the new RSS item right after </image> and before the first <item>
const beforeItems = rssContent.substring(0, insertPosition);
const afterItems = rssContent.substring(insertPosition);

// Ensure the RSS item has proper formatting (it should already have tabs from rss-item.js)
const newRssContent = beforeItems + rssItem.trim() + '\n' + afterItems;

// Write updated RSS file
try {
  fs.writeFileSync(rssFile, newRssContent, 'utf8');
  console.log(`✓ Updated rss.xml`);
} catch (error) {
  console.error(`Error writing rss.xml: ${error.message}`);
  process.exit(1);
}

console.log(`\n✓ Successfully published post!`);
console.log(`  - HTML: ${htmlFile}`);
console.log(`  - RSS: Updated rss.xml`);

