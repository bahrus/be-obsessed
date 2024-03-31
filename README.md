# be-obsessed [TODO]

Turn an unknown element into a custom element that extends [ob-session](https://github.com/bahrus/ob-session) that provides a gateway to an object stored in session storage.

The *ob-session* web component provides a declarative way of binding to a "store" that is kept in sessionStorage.  However, it doesn't scream out as being very semantic:

```html
<ob-session key=patientInfo></ob-session>
```

So instead we can do:

```html
<patient-info onchange be-obsessed></patient-info>
```

By default the key in session storage this will bind to will be  the tag name, but this can be configured (e.g. use the camelCased name).

```html
<patient-info key="localName.toCamelCase" be-obsessed onchange></patient-info>
```


We can then sprinkle this the web component through the page, without the need for repeating the be-obsessed attribute:

```html
<patient-info></patient-info>
```

What purpose does the onchange attribute fulfill?  Consider the security implications of being able pull in HTML from a database that stores HTML the end user edited.  It doesn't seem prudent to allow such HTML to declare itself a custom element capable of storing stuff in session storage, without some significant buy-in. The onchange attribute is an attribute that surely any decent sanitizer would prevent.  The presence of the attribute, then, indicates a significant level of trust applied to that local markup, and I believe is thus sufficient to weed out malicious code.  This check is only needed on the actual element that is being used to define the custom element, not on subsequent instances.

The choice of onchange isn't arbitrary.  The underlying base custom element that be-obsessed subclasses dispatches the onchange event, which would allow the developer to integrate custom script with the native JS parser built into the browser.  Use of that attribute, then, seems the most natural one to use for this purpose, as it would allow the same attribute to be used for both purposes.

