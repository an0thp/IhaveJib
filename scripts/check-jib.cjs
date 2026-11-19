const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {parseHTML} = require(process.argv[2]);
const {window} = parseHTML(fs.readFileSync('index.html','utf8'));
const context=vm.createContext({window,document:window.document,NodeFilter:{SHOW_TEXT:4},console,setTimeout,clearTimeout,setInterval:()=>0,clearInterval:()=>{},getComputedStyle:()=>({})});
for(const file of ['data','jib-snapshot','jib-content','main'])vm.runInContext(fs.readFileSync(`js/${file}.js`,'utf8'),context);
vm.runInContext('applyJibContent()',context);
const cards=[...window.document.querySelectorAll('.sc-9450aca3-0')].filter(c=>c.querySelector('h3'));
for(const card of cards){
  assert.match(card.querySelector('img').src,/jib.co.th/);
  assert.match(card.querySelector('a').href,/jib.co.th\/web\/product\/readProduct/);
  assert.ok(window.JIB_SNAPSHOT.products.some(p=>p.title===card.querySelector('h3').textContent));
}
assert.equal(window.document.querySelectorAll('img[src*="ihcupload"]').length,0);
vm.runInContext('initPcSetSectionTabs();initNotebookSectionTabs();initDiySectionTabs();initAccessoriesSectionTabs()',context);
for(const label of window.document.querySelectorAll('label.sc-f68a7e42-1,label.sc-c74f6a1c-2')) label.click();
for(const card of window.document.querySelectorAll('.sc-9450aca3-0')){
  if(!card.querySelector('h3'))continue;
  assert.match(card.querySelector('img').src,/jib.co.th/);
}
console.log(JSON.stringify({checkedCards:cards.length,products:window.JIB_SNAPSHOT.products.length,branches:window.JIB_SNAPSHOT.branches.length,tabClicks:'passed'}));
