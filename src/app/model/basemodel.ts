export class BaseModel {
    id: string;
    created_at: Date;
    updated_at: Date;

    constructor() {
        this.init();
    }

    init = () => {
        this.id = null;
        this.created_at = null;
        this.updated_at = null;
    }
}
