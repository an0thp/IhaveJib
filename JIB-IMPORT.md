# JIB content import

The website keeps the existing CSS and card layout. `js/jib-snapshot.js` stores public records from JIB; `js/jib-content.js` fills the existing cards before interactive controls initialize.

Sources: https://www.jib.co.th/web/ , linked category pages, and https://www.jib.co.th/web/branch . The current import includes 1,433 products, 88 banner records, category navigation, and 139 branches. The existing page shows a selection in its existing slots; the JIB links open the full listings.

Prices are a snapshot, not live stock or price guarantees. Refresh with `python -X utf8 scripts/import-jib.py` when network access is available. Python is only an optional maintenance tool; visitors use HTML, CSS, and JavaScript.

Validation: JavaScript syntax checks plus DOM checks of 76 initial product cards and tab switches. No browser screenshot comparison has been completed. Remaining work: full category coverage, all branch pagination, verified JIB video replacements, and visual verification across screen sizes.
