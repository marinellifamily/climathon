import { BaseModel } from './basemodel';

export class Sponsor extends BaseModel {

    name: string;

    constructor(name = null) {
        super();
        this.name = name;
    }
}
