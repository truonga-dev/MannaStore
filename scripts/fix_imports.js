const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.ts') || p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('authOptions')) {
        let original = c;
        c = c.replace(/import\s+\{\s*authOptions\s*\}\s+from\s+['"]@\/app\/api\/auth\/\[\.\.\.nextauth\]\/route['"]/g, 'import { authOptions } from "@/lib/auth"');
        if (c !== original) {
          fs.writeFileSync(p, c);
          console.log(`Updated ${p}`);
        }
      }
    }
  });
}

walk('src');
