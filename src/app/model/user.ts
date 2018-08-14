export class User {
    id: number;
    name: string;
    email: string;
    password: string;

    constructor() {
        this.init();
    }

    init = () => {
        this.name = null;
        this.email = null;
        this.password = null;
        this.id = null;
    }
}
