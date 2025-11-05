#!/usr/bin/env node

const fs = require('fs');
const { marked } = require('marked');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('Usage: node rss-item.js <markdown-file> <slug> <category> <description>');
  console.error('Example: node rss-item.js post.md mypost life "A short description of my post"');
  process.exit(1);
}

const [markdownFile, slug, category, description] = args;

// Read the markdown file
let markdownContent;
try {
  markdownContent = fs.readFileSync(markdownFile, 'utf8');
} catch (error) {
  console.error(`Error reading file: ${error.message}`);
  process.exit(1);
}

// Convert markdown to HTML
const contentHtml = marked(markdownContent);

// Extract title from first H1 heading
let title = 'Blog Post';
const h1Match = markdownContent.match(/^#\s+(.+)$/m);
if (h1Match) {
  title = h1Match[1];
}

// Generate pubDate in RSS format (current date/time)
const pubDate = new Date().toUTCString();

// Build the RSS item
const rssItem = `\t\t<item>
\t\t\t<title>${escapeXml(title)}</title>
\t\t\t<link>https://asnewman.github.io/${slug}</link>
\t\t\t<pubDate>${pubDate}</pubDate>
\t\t\t<author>ashleynewman@protonmail.com (Ash)</author>
\t\t\t<category>${escapeXml(category)}</category>
\t\t\t<description>
\t\t\t\t<![CDATA[${description}]]>
\t\t\t</description>
\t\t\t<content:encoded>
\t\t\t\t<![CDATA[<div style="max-width: 600px">
      ${contentHtml.trim()}
    </div>]]>
\t\t\t</content:encoded>
\t\t</item>`;

// Output to stdout
console.log(rssItem);

// Helper function to escape XML special characters (for non-CDATA content)
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}
