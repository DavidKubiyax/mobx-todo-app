import { Box, Button, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { observer } from "mobx-react";
import { useState } from "react";
import TodoEditForm from "../todo-edit-form/TodoEditForm";
import { TodoEditFormState } from "../todo-edit-form/TodoEditFormState";
import TodoItem from "../TodoItem";
import todoStore from "../TodoStore";
import TodoListItem from "./todo-list-item/TodoListItem";

const TodoList = observer(() => {

    const [currentlyEditing, setCurrentlyEditing] = useState<TodoItem|undefined>();

    return (
        <>
            <Stack sx={{width: '100%', height: '100%'}}>
                <Typography variant="h1">TODO LIST</Typography>
                <Button onClick={() => setCurrentlyEditing(new TodoItem())}>ADD NEW</Button>
                <Stack gap={"10px"} alignItems={"center"}>
                    {todoStore.todoItems.map(item => (
                        <TodoListItem key={item.id} item={item} onEditRequest={(item) => setCurrentlyEditing(item)} onDeleteRequest={(item) => {todoStore.remove(item)}}/>
                    ))}
                </Stack>
            </Stack>
            {!!currentlyEditing && 
                /*
                 Small caveat of MUI's Modal:
                 The modal is always rendered and has 'display: none' set to it.
                 If the rendering depends on a state that can be null|undefined, 
                 we must conditionally render the modal itself!
                */
                <Modal 
                    open={true}
                    onClose={() => setCurrentlyEditing(undefined)}
                >
                    <div>
                        {/*
                          Another small caveat:
                          MUI's modal must always have a referrable element as its root, rather than a component.
                          All MUI default components should have React.forwardRef implemented.
                          However, most custom function components don't have it, so it's common to see a <div> wrapped
                          around the content of a Modal.
                         */}
                        <TodoEditForm 
                            formState={new TodoEditFormState(currentlyEditing!, todoStore)}
                            afterSubmit={() => setCurrentlyEditing(undefined)}
                        />
                    </div>
                </Modal>
            }
        </>
    );
});

export default TodoList;