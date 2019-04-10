export class Todo {
    id: number;
    title: string;
    description: string;
    status: string;
    image: string;

    constructor(id: number, title: string, description: string, status: string, image: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.image = image;
    }
}
