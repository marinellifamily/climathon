import { BaseModel } from './basemodel';

export class Cost extends BaseModel {
    solution_id: number;
    name: string;
    description: string;
    price: number;
    amount: number;

    constructor() {
        super();
    }

    init = () => {
        this.solution_id = null;
        this.name = null;
        this.description = null;
        this.price = 0;
        this.amount = 0;
    }
}
