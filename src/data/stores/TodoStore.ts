import { action, IObservableArray, makeObservable, observable } from "mobx";
import { generateUUID } from "../../utils";
import TodoItem from "../models/TodoItem";


/**
 * Maintaining an interface along with a store allows us
 * to easily implement another one for testing with mock
 * data at any given phase of the app.
 */

export interface ITodoStore {
    todoItems: IObservableArray<TodoItem>;
    create: (item: TodoItem) => void;
    remove: (item: TodoItem) => void;
}

/**
 * In general, a store's purpose is to hold and manage a cache of data.
 * Anything more specific than that should be done in local states.
 */

export class TodoStore implements ITodoStore {

    constructor() {
        makeObservable(this);
        // create fake data
        for (let i=0; i<10; i++) {
            const newTodo = new TodoItem({
                id: generateUUID(),
                title: `item number ${i}`,
                description: `description of item ${i}`,
                isDone: false
            });
            this.create(newTodo);
        }
    }

    @observable todoItems: IObservableArray<TodoItem> = observable.array<TodoItem>([]);

    @action create(item: TodoItem) {
        // The item is brand new and has no ID yet, we need to handle that
        item.id = generateUUID();
        this.todoItems.push(item);
    }

    @action remove(item: TodoItem) {
        this.todoItems.remove(item);
    }

}