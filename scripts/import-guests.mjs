// One-shot script to import wedding_list.csv into the invitees table.
// Run from the project root: node scripts/import-guests.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// ── Env ──────────────────────────────────────────────────────────────────────

const envContent = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
const env = Object.fromEntries(
  envContent
    .split(/\r?\n/)
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => {
      const idx = line.indexOf('=');
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    })
);

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['SUPABASE_SERVICE_ROLE_KEY']
);

// ── CSV parsing ───────────────────────────────────────────────────────────────

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

const csvPath = 'C:\\Users\\andre\\OneDrive\\Desktop\\wedding_list.csv';
const lines = readFileSync(csvPath, 'utf-8').trim().split(/\r?\n/);

// Skip header row
const rows = lines.slice(1).map(line => {
  const [token_invite, name, adults, kids] = parseCSVLine(line);
  return {
    name: name.replace(/^"|"$/g, '').trim(),
    type: 'Pom',
    token_invite: token_invite === '1' ? 1 : null,
    adults: adults !== '' ? parseInt(adults, 10) : null,
    kids: kids !== '' ? parseInt(kids, 10) : null,
  };
});

// ── Insert ────────────────────────────────────────────────────────────────────

console.log(`Importing ${rows.length} guests...`);
rows.forEach(r => console.log(` • ${r.name} (token_invite=${r.token_invite}, adults=${r.adults ?? '-'}, kids=${r.kids ?? '-'})`));

const { error } = await supabase.from('invitees').insert(rows);

if (error) {
  console.error('\nImport failed:', error.message);
  process.exit(1);
}

console.log(`\nDone — ${rows.length} guests inserted.`);
