export interface TaskProps {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    userId: string,
    createdAt: string
}

export class Task {
    constructor(private props: TaskProps) {
        if (!props.title) throw new Error("Title is required");
    }

    get id() { return this.props.id; }
    get title() { return this.props.title; }
    get description() { return this.props.description; }
    get completed() { return this.props.completed; }
    get userId() { return this.props.userId; }
    get createdAt() { return this.props.createdAt; }

    toJSON() {
        return { ...this.props };
    }
}