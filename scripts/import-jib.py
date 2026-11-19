"""Import public JIB homepage content; keep source URLs with every record."""
from html.parser import HTMLParser
from urllib.request import urlopen, Request
from urllib.parse import urljoin
from pathlib import Path
import json
import re
from concurrent.futures import ThreadPoolExecutor

BASE = 'https://www.jib.co.th/web/'
class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []
    def walk(self):
        yield self
        for child in self.children:
            if isinstance(child, Node): yield from child.walk()
    def text(self):
        return ' '.join(c.text() if isinstance(c, Node) else c for c in self.children if not isinstance(c, Node) or c.tag not in ('script', 'style'))
class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.root = Node(); self.current = self.root
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.current); self.current.children.append(n)
        if tag not in ('img','input','meta','link','br','hr','source','area','wbr','embed','param','base','col'): self.current = n
    def handle_endtag(self, tag):
        n = self.current
        while n.parent:
            if n.tag == tag: self.current = n.parent; break
            n = n.parent
    def handle_data(self, data): self.current.children.append(data)
def read(url):
    with urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=45) as r:
        html = r.read().decode('utf-8', errors='replace')
    p=Parser(); p.feed(html); return p.root
def clean(s): return re.sub(r'\s+', ' ', s).strip()
def absolute(s): return urljoin(BASE, s)
def main():
    root=read(BASE)
    urls=[BASE+'product/product_list/'+p for p in ['2/1545','2/1706','2/25','2/43','2/1624','2/1621','2/1627','2/46','2/51','2/53','2/233','3/1683','2/1367','2/1438','2/1383','2/338','2/1434']]
    with ThreadPoolExecutor(max_workers=3) as pool:
        for extra in pool.map(read, urls): root.children.append(extra)
    products={}; banners=[]; categories={}
    for n in root.walk():
        if n.tag != 'a': continue
        href=absolute(n.attrs.get('href',''))
        imgs=[x for x in n.walk() if x.tag=='img' and x.attrs.get('src')]
        title=clean(n.attrs.get('title','') or n.text())
        if '/product/product_list/' in href and title: categories[href]={'title':title,'url':href}
        if 'readProduct/' in href and imgs and n.attrs.get('title'):
            pid=re.search(r'readProduct/(\d+)',href)
            if not pid or pid[1] in products: continue
            ancestor=n.parent
            # Find the nearest product container containing a price field.
            price_nodes=[]
            for _ in range(8):
                price_nodes=[x for x in ancestor.walk() if 'price' in x.attrs.get('class','').lower() and re.search(r'\d',x.text())]
                if price_nodes: break
                if not ancestor.parent: break
                ancestor=ancestor.parent
            products[pid[1]]={'id':pid[1], 'title':title, 'url':href,'image':absolute(imgs[0].attrs['src']), 'priceFields':[{'class':x.attrs.get('class'), 'text':clean(x.text())} for x in price_nodes]}
        if imgs and ('clickbannerlink' in n.attrs.get('class','') or n.attrs.get('data-banner')):
            banners.append({'title':imgs[0].attrs.get('alt','JIB'), 'url':href, 'image':absolute(imgs[0].attrs['src'])})
    branches=[]
    for n in read(BASE+'branch').walk():
        if 'list_branch_box' not in n.attrs.get('class',''): continue
        top=next((x for x in n.walk() if 'top_box' in x.attrs.get('class','')),n)
        content=clean(top.text())
        maps=next((x.attrs['href'] for x in top.walk() if x.tag=='a' and 'maps.app' in x.attrs.get('href','')),BASE+'branch')
        title=content.split('เลขที่')[0].strip()
        if len(title)>100: title=content.split('https:')[0][:70]
        phones=re.findall(r'0\d{1,2}-\d{3,4}-\d{3,4}',content)
        branches.append({'title':title,'detail':content,'phone':', '.join(dict.fromkeys(phones)),'url':maps})
    data={'source':BASE,'products':list(products.values()),'banners':banners,'categories':list(categories.values()),'branches':branches}
    dest=Path(__file__).resolve().parents[1]/'js'/'jib-snapshot.js'
    dest.write_text('window.JIB_SNAPSHOT = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    print(json.dumps({'products':len(products),'banners':len(banners),'categories':len(categories),'branches':len(branches)}))
if __name__=='__main__': main()
