# be-obsessed [TODO]

Turn an unknown element into a custom element that extends [ob-session](https://github.com/bahrus/ob-session) that provides a gateway to an object stored in session storage.

The *ob-session* web component provides a declarative way of binding to a "store" that is kept in sessionStorage.  However, it doesn't scream out as being very semantic:

```html
<ob-session key=patientInfo></ob-session>
```

So instead we can do:

```html
<patient-info be-obsessed></patient-info>
```

By default the key in session storage this will bind to will be  the tag name, but this can be configured (e.g. use the camelCased name).

```html
<patient-info key="localName.toCamelCase" be-obsessed></patient-info>
```


We can then sprinkle this the web component through the page, without the need for repeating the be-obsessed attribute:

```html
<patient-info></patient-info>
```

