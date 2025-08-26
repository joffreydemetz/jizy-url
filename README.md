# jizy-url 

A simple URL management library for JavaScript applications.
I'm not sure it can be useful to anyone else!

## Features

- Set and manage a base path for URLs
- Generate URLs with optional JSON prefix
- Build query strings from objects (including array support)

## Installation

Copy `lib/js/url.js` into your project or import it as needed.

## Usage

```js
import jUrl from './lib/js/url.js';

const urlManager = new jUrl('/api');

// Generate a URL with JSON prefix and query parameters
const url = urlManager.make('user/profile', { id: 42, tags: ['admin', 'editor'] });
// Result: /api/json/user/profile/?id=42&tags[]=admin&tags[]=editor

// Generate a URL without JSON prefix
const url2 = urlManager.make('user/profile', { id: 42 }, true);
// Result: /api/user/profile/?id=42
```

## API

### `new jUrl(basePath)`
Create a new instance. `basePath` is the root for all generated URLs (default: `/`).

### `setBasePath(basePath)`
Set or update the base path. Returns the instance for chaining.

### `make(path, vars, notJson)`
- `path` (string): The endpoint path (slashes are normalized)
- `vars` (object): Query parameters (arrays supported)
- `notJson` (boolean): If `true`, omits the `json/` prefix
Returns the constructed URL string.

### `toQueryString(vars)`
Convert an object to a query string. Arrays are serialized as repeated keys with `[]`.
