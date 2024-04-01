import { BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import { BEConfig} from 'be-enhanced/types';
import { XE} from 'xtal-element/XE.js';
import { Actions, AllProps, AP, PAP, ProPAP, POA} from './types';

export class BeObsessed extends BE<AP, Actions> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }

    async register(self: this): ProPAP {
        //TODO:  this seems like a nice shareable function that could be used in other scenarios.
        //move to trans-render?
        const {enhancedElement} = self;
        if(!(enhancedElement as HTMLElement).onload && !(enhancedElement as HTMLElement).oninput && !(enhancedElement as HTMLElement).onerror){
            throw 'onload or oninput or onerror must be specified'
        }
        const {localName} = enhancedElement;
        const inherits = enhancedElement.getAttribute('inherits') || (<any>window)['be-obsessed']?.dataset?.inherits;
        if(inherits){
            const inheritFrom = await customElements.whenDefined(inherits);
            customElements.define(localName, class extends inheritFrom{});
        }else{
            if(customElements.get(localName) === undefined){
                //await import('fetch-for/fetch-for.js');
                const fetchFor = await customElements.whenDefined('fetch-for');
                customElements.define(localName, class extends fetchFor{});
            }
        }

        
        return{
            resolved: true,
        }
    }
}

export interface BeObsessed extends AllProps{}

export const tagName = 'be-obsessed';