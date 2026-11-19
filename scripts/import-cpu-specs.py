"""Import the core count and base clock of the featured JIB CPUs."""
import json
import re
import runpy
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

source = runpy.run_path(str(Path(__file__).with_name('import-jib.py')))

def read_specs(product_id):
    try:
        root = source['read'](source['BASE'] + 'product/readProduct/' + product_id)
    except (OSError, ValueError):
        return product_id, []
    rows = [source['clean'](node.text()) for node in root.walk()
            if 'bor_top' in node.attrs.get('class', '').split()]
    counts = next((row for row in rows if row.startswith('CPU Core / Thread')), '')
    frequency = next((row for row in rows if row.startswith('Frequency ')), '')
    return product_id, [counts, frequency]

with ThreadPoolExecutor(max_workers=5) as pool:
    specs = {key: value for key, value in pool.map(read_specs, sys.stdin.read().split()) if any(value)}
if not specs:
    raise SystemExit('No CPU specs found')
path = Path(__file__).resolve().parents[1] / 'js' / 'cpu-specs.js'
path.write_text('window.JIB_CPU_SPECS = ' + json.dumps(specs, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(f'Imported {len(specs)} CPU records')
