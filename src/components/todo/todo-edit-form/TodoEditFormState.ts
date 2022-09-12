import { action, makeObservable, observable } from "mobx";
import TodoItem from "../TodoItem";
import { ITodoStore } from "../TodoStore";

export class TodoEditFormState {

    /**
     * Constructs a new instance of TodoEditFormState.
     * @param itemForEdit the item we want to edit for the purpose of cloning.
     * @param store manual dependency injection of the store. 
     * 
     * It's important that state/store classes don't get direct references of singletons for the following reasons: 
     * 1. It makes spaghetti code! This way it's very clear which state is dependant on which store.
     * 2. It makes the class testable, meaning you can create "class MockTodoStore implements ITodoStore" and test this 
     *    TodoEditFormState extensively as much as you'd like without contacting the real database.
     */
    constructor(itemForEdit: TodoItem, store: ITodoStore) {
        makeObservable(this)
        this.editClone = itemForEdit.clone();
        this.store = store;
    }

    private store: ITodoStore;
    editClone: TodoItem;

    @action save() {
        if (!!this.editClone.id) {
            this.store.update(this.editClone);
        } else {
            this.store.create(this.editClone);
        }
    }
}