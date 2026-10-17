// Builds index.html from src/template.html + content/home.json (no dependencies)
const fs=require('fs');
const c=JSON.parse(fs.readFileSync('content/home.json','utf8'));
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const img=p=>esc(String(p||'').replace(/^\//,''));
const gallery=(c.gallery||[]).map(g=>`\n    <figure><img src="${img(g.image)}" alt="${esc(g.alt)}"><figcaption>${esc(g.caption)}</figcaption></figure>`).join('');
const card=item=>`<div class="class-card"><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><a href="${esc(item.link_url)}">${esc(item.link_text)}</a></div>`;
const tickets=`<div class="classes-tickets"><p>${esc(c.classes_tickets_note)}</p><a class="tickets" href="${esc(c.classes_tickets_url)}">${esc(c.classes_tickets_text)}</a></div>`;
const classes='\n    <ul class="class-list">'+ (c.classes||[]).map(item=>item.title==='Youth Cooking Classes'
  ? `\n      <li class="class-group">${card(item)}${tickets}</li>`
  : `\n      <li class="class-card"><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><a href="${esc(item.link_url)}">${esc(item.link_text)}</a></li>`).join('') +'\n    </ul>';
let t=fs.readFileSync('src/template.html','utf8');
const v={...c,bear_image:img(c.bear_image)};
t=t.replace('{{gallery}}',gallery).replace('{{classes}}',classes).replace(/\{\{(\w+)\}\}/g,(m,k)=>k==='bear_image'?v[k]:esc(v[k]));
fs.writeFileSync('index.html',t);console.log('Built index.html');
