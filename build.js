// Builds index.html from src/template.html + content/home.json (no dependencies)
const fs=require('fs');
const c=JSON.parse(fs.readFileSync('content/home.json','utf8'));
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const img=p=>esc(String(p||'').replace(/^\//,''));
const gallery=(c.gallery||[]).map(g=>`\n    <figure><img src="${img(g.image)}" alt="${esc(g.alt)}"><figcaption>${esc(g.caption)}</figcaption></figure>`).join('');
let t=fs.readFileSync('src/template.html','utf8');
const v={...c,bear_image:img(c.bear_image)};
t=t.replace('{{gallery}}',gallery).replace(/\{\{(\w+)\}\}/g,(m,k)=>k==='bear_image'?v[k]:esc(v[k]));
fs.writeFileSync('index.html',t);console.log('Built index.html');
