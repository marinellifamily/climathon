import { BaseModel } from './basemodel';
import { Cost } from './cost';

export class Solution extends BaseModel {

    user_id: number;
    proposal_id: number;
    name: string;
    description: string;
    likes: number;
    costs: Cost[];
    total: number;

    constructor(options?) {
        super();
        options ? Object.assign(this, options) : this.init();
    }

    init = () => {
        this.user_id = null;
        this.proposal_id = null;
        this.name = null;
        this.description = null;
        this.description = null;
        this.likes = null;
        this.costs = [new Cost()];
        this.total = 0;
    }

}
