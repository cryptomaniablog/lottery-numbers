Lottery numbers
===============

Lottery numbers is a Javascript lottery number generator, that can be configured
to generate lottery results using different parameters, calculates matching 
probabilities, and allows for colour number range categories.

Cross-platform Compatibility
----------------------------

* Firefox 4+
* Safari 6+
* Opera 12+
* Google Chrome 7+
* Internet Explorer 9+

Example Usage
-------------

To generate a common 1 to 49, 6 number picked lottery, use the following:

```js
    var lottery = Lottery({
        auto_gen: true,
        min: 1,
        max: 49,
        q: 6,
        b: 0
    });
```

To generate a common 1 to 45, 6 base and 2 bonus (supplementary) number picked 
lottery, use the following:

```js
    var lottery = Lottery({
        auto_gen: true,
        min: 1,
        max: 45,
        q: 6,
        b: 2
    });
```

Feature Overview
----------------

* Generates and displays lottery numbers
* Supports base number quantity setting
* Supports bonus number quanity setting
* Supports min and max number range setting
* In-browser settings and regeneration
* Calculates probabilities and displays in table
* Supports colour number range categorisation

MIT License
===========

**Lottery numbers is free software under MIT License.**

#### Copyright (c) 2014 Robert Stettner,<br />
http://github.com/robertstettner/lottery-numbers

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
