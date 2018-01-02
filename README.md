# Console Decor

Console function enhancement. Adds timestamp, file path, line number to console log and error calls

## Usage

Call as a function with optional config parameter to override console functions

```
require('console-decor')();
console.log('Hello World');

```

## Config options

### appdir

Manually specify the application directory. Defaults to require.main.filename. Functionally, this parameter is removed from the absolute file path in order to condense the output.

```
require('console-decor')({appdir: ''}); // show absolute path
console.log('Hello World');

```
