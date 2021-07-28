# cron-parser

Expands a cron expression into a more readable format. See [crontab(5)](https://man7.org/linux/man-pages/man5/crontab.5.html) for more details on the cron syntax.

## Quick start

Ensure you have the prerequisites installed: Node.js v14.17.0, npm v7.20.2.

Setup:

```sh
npm i                                          # install dependencies
npm link                                       # make the CLI available on your PATH
```

Run:

```sh
$ cron-parser "*/15 0 1,15 * 1-5 /usr/bin/find"
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find
```

Expressions which cannot be parsed will produce an error:

```sh
$ cron-parser "*/ 0 1,15 * 1-5 /usr/bin/find"  # invalid step value expression
invalid expression
```

Tested on Mac OS X Big Sur 11.5.

## Supported features

| Syntax | Description        | Notes                                                          |
| ------ | ------------------ | -------------------------------------------------------------- |
| \*     | any/wildcard value |                                                                |
| ,      | list of values     |                                                                |
| -      | range of values    |                                                                |
| /      | step values        | Can only be used in conjunction with wildcard range, e.g. \*/5 |

## Tests

Run tests with:

```sh
npm test
```

Or watch files:

```sh
npm test -- --watch
```

## Possible improvements

- improve parsing validation (i.e. not providing enough fields)
- implement extensions or non-standard cron syntax
- allow names for month or day of week
