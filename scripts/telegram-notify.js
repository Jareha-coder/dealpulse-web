// scripts/telegram-notify.js
// Node 18+ (GitHub Actions runner has Node 18+)

import fs from 'fs/promises';
import process from 'process';
import fetch from 'node-fetch';

const DATA_PATH = './data/deals.json';
const TOKEN = process.env.TG_BOT_TOKEN;
const CHAT = process.env.TG_CHAT_ID;

if(!TOKEN || !CHAT){
  console.error('Missing TG_BOT_TOKEN or TG_CHAT_ID in env');
  process.exit(1);
}

async function main(){
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  const deals = JSON.parse(raw);

  let changed = false;
  for(const d of deals){
    if(d.featured && !d.notified){
      // build message
      const title = d.title;
      const price = d.price||'—';
      const line = `🔥 FEATURED: ${title}\nPrice: ${price}\nStore: ${d.retailer||'—'}\n${d.desc||''}\n🔗 ${d.link}\n\nJoin VIP for instant alerts: ${process.env.VIP_LINK||'[VIP LINK HERE]'}`;
      const payload = new URLSearchParams();
      payload.append('chat_id', CHAT);
      payload.append('text', line);
      payload.append('parse_mode','HTML');

      const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {method:'POST', body: payload});
      const json = await res.json();
      if(json.ok){
        console.log('Sent alert for', d.id || title);
        d.notified = true;
        changed = true;
      } else {
        console.error('TG error', json);
      }
      // small pause to avoid rate limits
      await new Promise(r=>setTimeout(r, 1200));
    }
  }

  if(changed){
    await fs.writeFile(DATA_PATH, JSON.stringify(deals, null, 2), 'utf8');
    console.log('Updated deals.json with notified flags.');
  } else {
    console.log('No new featured deals to notify.');
  }
}

main().catch(err=>{console.error(err); process.exit(1);});
