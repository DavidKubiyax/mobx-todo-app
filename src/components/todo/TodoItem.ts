import { action, makeObservable, observable } from "mobx";

/**
 * Wrapping a model with an observable class allows for real-time updates 
 * while maintaining the same instances, instead of overriding the entire
 * collection with reduction.
 */
export default class TodoItem {

    constructor(id?: string) {
        this.id = id;
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
    
    clone(): TodoItem {
        const clone = new TodoItem(this.id);
        clone.update(this);
        return clone;
    }
} 