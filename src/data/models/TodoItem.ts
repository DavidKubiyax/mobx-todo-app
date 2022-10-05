import { action, makeObservable, observable } from "mobx";

interface ITodoItem {
    id?: string;
    isDone?: boolean;
    title?: string;
    description?: string;
}

/**
 * Wrapping a model with an observable class allows for real-time updates 
 * while maintaining the same instances, instead of overriding the entire
 * collection with reduction.
 */
export default class TodoItem implements ITodoItem {

    constructor(params?: ITodoItem) {
        if (params) {
            this.id = params.id;
            this.isDone = params.isDone ?? false;
            this.title = params.title ?? "";
            this.description = params.description ?? "";
        }
        makeObservable(this);
    }

    id?: string;

    @observable isDone: boolean = false;
    @action setIsDone(val: boolean) {
        this.isDone = val;
    }

    @observable title: string = '';
    @action setTitle(val: string) {
        this.title = val;
    }

    @observable description: string = '';
    @action setDescription(val: string) {
        this.description = val;
    }
    
    @action update(item: TodoItem) {
        // don't need to use setters since it's an action
        this.isDone = item.isDone;
        this.title = item.title;
        this.description = item.description;
    }
} 