import { BaseModel } from './basemodel';

export class Report extends BaseModel {
    user_id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    level: number;
    type: number;
    description: string;
    date: any;
    confirmations: number;
    laws: any[];

    constructor(options?) {
        super();
        options ? Object.assign(this, options) : this.init();
    }

    init = () => {
        this.user_id = null;
        this.name = null;
        this.address = null;
        this.lat = null;
        this.lng = null;
        this.level = null;
        this.type = null;
        this.description = null;
        this.date = null;
        this.confirmations = null;
        this.laws = [];
    }
}
