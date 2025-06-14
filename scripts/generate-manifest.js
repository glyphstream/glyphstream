#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import fg from 'fast-glob';

(async () => {
  const files = await fg(['**/*.*'], { cwd: 'assets', onlyFiles: true });
  await fs.writeFile(
    join('assets', 'manifest.json'),
    JSON.stringify({ files }, null, 2) + '\n'
  );
  console.log(`manifest.json updated with ${files.length} assets`);
})();
