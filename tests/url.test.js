import jUrl from '../lib/index.js';

describe('jUrl constructor / setBasePath', () => {
    test('defaults basePath to "/" when no argument given', () => {
        expect(new jUrl().basePath).toBe('/');
    });

    test('defaults basePath to "/" when empty string passed', () => {
        expect(new jUrl('').basePath).toBe('/');
    });

    test('appends a single trailing slash', () => {
        expect(new jUrl('/api').basePath).toBe('/api/');
    });

    test('collapses multiple trailing slashes to one', () => {
        expect(new jUrl('/api///').basePath).toBe('/api/');
    });

    test('preserves leading slash characters as-is', () => {
        expect(new jUrl('api').basePath).toBe('api/');
    });

    test('setBasePath returns the instance (chainable)', () => {
        const u = new jUrl();
        expect(u.setBasePath('/v2')).toBe(u);
    });

    test('setBasePath updates basePath in place', () => {
        const u = new jUrl('/api');
        u.setBasePath('/v2');
        expect(u.basePath).toBe('/v2/');
    });
});

describe('jUrl.make', () => {
    test('returns basePath when called with no args', () => {
        expect(new jUrl('/api').make()).toBe('/api/');
    });

    test('treats non-string path as empty', () => {
        expect(new jUrl('/api').make(42)).toBe('/api/');
        expect(new jUrl('/api').make(null)).toBe('/api/');
        expect(new jUrl('/api').make(undefined)).toBe('/api/');
    });

    test('strips leading and trailing slashes from path', () => {
        expect(new jUrl('/api').make('/users/')).toBe('/api/users');
        expect(new jUrl('/api').make('///users///')).toBe('/api/users');
    });

    test('preserves internal slashes in path', () => {
        expect(new jUrl('/api').make('users/42/profile')).toBe('/api/users/42/profile');
    });

    test('appends query string when vars given', () => {
        expect(new jUrl('/api').make('users', { id: 42 })).toBe('/api/users?id=42');
    });

    test('does not append "?" when vars is null or omitted', () => {
        expect(new jUrl('/api').make('users')).toBe('/api/users');
        expect(new jUrl('/api').make('users', null)).toBe('/api/users');
    });

    test('appends only "?" when vars is an empty object', () => {
        // toQueryString returns '' for empty object → no '?' appended
        expect(new jUrl('/api').make('users', {})).toBe('/api/users');
    });
});

describe('jUrl.toQueryString', () => {
    let u;
    beforeEach(() => { u = new jUrl(); });

    test('returns empty string for empty object', () => {
        expect(u.toQueryString({})).toBe('');
    });

    test('serializes a single scalar pair', () => {
        expect(u.toQueryString({ id: 42 })).toBe('?id=42');
    });

    test('joins multiple pairs with "&"', () => {
        expect(u.toQueryString({ id: 42, name: 'bob' })).toBe('?id=42&name=bob');
    });

    test('encodes keys and values', () => {
        expect(u.toQueryString({ 'a b': 'c d' })).toBe('?a%20b=c%20d');
        expect(u.toQueryString({ q: 'a&b=c' })).toBe('?q=a%26b%3Dc');
    });

    test('serializes array values as repeated key[] entries (brackets left literal)', () => {
        expect(u.toQueryString({ tags: ['admin', 'editor'] }))
            .toBe('?tags[]=admin&tags[]=editor');
    });

    test('mixes scalar and array values', () => {
        expect(u.toQueryString({ id: 1, tags: ['a', 'b'] }))
            .toBe('?id=1&tags[]=a&tags[]=b');
    });

    test('serializes empty array to empty string', () => {
        expect(u.toQueryString({ tags: [] })).toBe('');
    });

    test('coerces non-string scalars via encodeURIComponent', () => {
        expect(u.toQueryString({ active: true, count: 0 })).toBe('?active=true&count=0');
    });
});
