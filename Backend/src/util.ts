import {createHash} from 'crypto';

export function random(input : any | string){
    const hash=createHash('sha256');
    hash.update(input);
    const fullHash=hash.digest('hex');
    return fullHash.slice(0,10);
}