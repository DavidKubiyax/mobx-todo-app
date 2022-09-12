import { action, IObservableArray, makeObservable, observable } from "mobx";
import { generateUUID } from "../../utils";
import TodoItem from "./TodoItem";


/**
 * Maintaining a singleton in TypeScript requires exporting an interface 
 * instead of the class definition to interact with the instance.
 * This way we achieve 2 important goals:
 * 1. Preventing the creation of a new instance.
 * 2. Allowing other classes to implement the interface for unit tests.
 */

export interface ITodoStore {
    todoItems: IObservableArray<TodoItem>;
    create: (item: TodoItem) => void;
    update: (item: TodoItem) => void;
    remove: (item: TodoItem) => void;
}

/**
 * In general, a store's purpose is to hold and manage a cache of data.
 * Anything more specific than that should be done in local states, 
 * whether they're Mobx classes or local React useState.
 */

class TodoStore implements ITodoStore {

    constructor() {
        makeObservable(this);
    }

    /**
     * In case a singleton needs to fetch important data, 
     * it's crucial that it'd have an "init" function to be called
     * when the app/first dependant component loads.
     */
    init() {
        // create fake data
        for (let i=0; i<10; i++) {
            const newTodo = new TodoItem(generateUUID());
            newTodo.setTitle(`item number ${i}`);
            newTodo.setDescription(`description of item ${i}`);
            this.create(newTodo);
        }
    }

    @observable todoItems: IObservableArray<TodoItem> = observable.array<TodoItem>([]);

    @action create(item: TodoItem) {
        // The item is brand new and has no ID yet, we need to handle that
        item.id = generateUUID();
        this.todoItems.push(item);
    }

    @action update(item: TodoItem) {
        // The item already exists, we need to find it and update it
        const existingItem = this.todoItems.find(i => i.id === item.id);
        if (!!existingItem) {
            existingItem.update(item);
        }
    }

    @action remove(item: TodoItem) {
        this.todoItems.remove(item);
    }

}

const todoStore = new TodoStore();
export default todoStore;