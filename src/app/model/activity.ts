import { BaseModel } from './basemodel';
import { Sponsor } from './sponsor';

export class Activity extends BaseModel {
    name: string;
    cost: number;
    date: Date;
    description: string;
    reason: string;
    sponsors: Sponsor[];
    lat: number;
    lng: number;
    address: string;
    hour: any;

    constructor(options?) {
        super();
        options ? Object.assign(this, options) : this.init();
    }

    init = () => {
        this.name = null;
        this.cost = null;
        this.date = null;
        this.description = null;
        this.reason = null;
        this.address = null;
        this.sponsors = [];
        this.hour = null;
    }


}
