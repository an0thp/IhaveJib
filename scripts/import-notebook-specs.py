"""Read JIB specification fields for the Notebook cards."""
import json
import runpy
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

source = runpy.run_path(str(Path(__file__).with_name('import-jib.py')))
fields = {
    'cpu model': 'CPU', 'processor': 'CPU', 'cpu brand': 'CPU',
    'graphic chip': 'GPU', 'ram': 'RAM', 'ram type': '',
    'hdd 1 capacity': 'SSD', 'display size': 'จอ', 'display type': '',
    'os': 'OS',
}

def read_specs(product_id):
    try:
        root = source['read'](source['BASE'] + 'product/readProduct/' + product_id)
    except (OSError, ValueError):
        return product_id, ''
    values = {}
    for row in root.walk():
        if 'bor_top' not in row.attrs.get('class', '').split():
            continue
        cells = {key: source['clean'](node.text()) for node in row.walk()
                 for key in ('quest', 'answer') if key in node.attrs.get('class', '').split()}
        if cells.get('quest') and cells.get('answer') not in (None, '', '-'):
            values[cells['quest'].lower()] = cells['answer']
    specs = {}
    for field, label in fields.items():
        if label and field in values:
            specs.setdefault(label, values[field])
    for label, field in [('RAM', 'ram type'), ('จอ', 'display type')]:
        if label in specs and field in values:
            specs[label] += ' ' + values[field]
    return product_id, ' · '.join(f'{key}: {value}' for key, value in specs.items())

with ThreadPoolExecutor(max_workers=6) as pool:
    specs = {key: value for key, value in pool.map(read_specs, sys.stdin.read().split()) if value}
if not specs:
    raise SystemExit('No notebook specs found')
path = Path(__file__).resolve().parents[1] / 'js' / 'notebook-specs.js'
path.write_text('window.JIB_NOTEBOOK_SPECS = ' + json.dumps(specs, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(f'Imported specs for {len(specs)} notebooks')
