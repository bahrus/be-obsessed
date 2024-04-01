import { BE } from 'be-enhanced/BE.js';
export class BeObsessed extends BE {
    static get beConfig() {
        return {
            parse: true,
            isParsedProp: 'isParsed'
        };
    }
    async register(self) {
        //TODO:  this seems like a nice shareable function that could be used in other scenarios.
        //move to trans-render?
        const { enhancedElement } = self;
        if (!enhancedElement.onload && !enhancedElement.oninput && !enhancedElement.onerror) {
            throw 'onload or oninput or onerror must be specified';
        }
        const { localName } = enhancedElement;
        const inherits = enhancedElement.getAttribute('inherits') || window['be-obsessed']?.dataset?.inherits;
        if (inherits) {
            const inheritFrom = await customElements.whenDefined(inherits);
            customElements.define(localName, class extends inheritFrom {
            });
        }
        else {
            if (customElements.get(localName) === undefined) {
                //await import('fetch-for/fetch-for.js');
                const fetchFor = await customElements.whenDefined('fetch-for');
                customElements.define(localName, class extends fetchFor {
                });
            }
        }
        return {
            resolved: true,
        };
    }
}
export const tagName = 'be-obsessed';
