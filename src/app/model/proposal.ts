import { BaseModel } from './basemodel';
import { Solution } from './solu';

export class Proposal extends BaseModel {
    important: number;
    user_id: number;
    name: string;
    description: string;
    reason: string;
    address: string;
    likes: number;
    dislikes: number;
    lat: number;
    lng: number;
    solutions: Solution[];

    constructor(options?) {
        super();
        options ? Object.assign(this, options) : this.init();
    }

    init = () => {
        this.important = null;
        this.user_id = null;
        this.name = null;
        this.description = null;
        this.reason = null;
        this.address = null;
        this.likes = null;
        this.dislikes = null;
        this.lat = null;
        this.lng = null;
        this.solutions = [new Solution()];
    }
}
