# jizy-url 

A simple URL management library for JavaScript applications.
I'm not sure it can be useful to anyone else!

## Features

- Set and manage a base path for URLs
- Build query strings from objects (including array support)

## Installation

```bash
npm install jizy-url
```

## Usage

```js
import jUrl from 'jizy-url';

const urlManager = new jUrl('/api');

// Generate a URL with query parameters (arrays supported)
const url = urlManager.make('user/profile', { id: 42, tags: ['admin', 'editor'] });
// Result: /api/user/profile?id=42&tags[]=admin&tags[]=editor

// Without query parameters
const url2 = urlManager.make('user/profile');
// Result: /api/user/profile
```

## API

### `new jUrl(basePath)`
Create a new instance. `basePath` is the root for all generated URLs (default: `/`). A trailing slash is always added.

### `setBasePath(basePath)`
Set or update the base path. Returns the instance for chaining.

### `make(path, vars)`
- `path` (string): The endpoint path. Leading and trailing slashes are stripped; non-string values are treated as empty.
- `vars` (object | null): Query parameters (arrays supported). Omit or pass `null` for none.

Returns the constructed URL string.

### `toQueryString(vars)`
Convert an object to a query string (prefixed with `?`). Arrays are serialized as repeated keys with `[]` (brackets left literal, value URL-encoded). Returns `''` if the result has no entries.

## Tests

```bash
npm install
npm test
```
