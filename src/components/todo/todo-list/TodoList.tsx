import { Box, Button, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { observer } from "mobx-react";
import { useState, useContext } from "react";
import { TodoContext } from "../../../data/contexts/TodoContext";
import TodoEditForm from "../todo-edit-form/TodoEditForm";
import TodoItem from "../../../data/models/TodoItem";
import TodoListItem from "./todo-list-item/TodoListItem";

const TodoList = observer(() => {

    const {todoStore} = useContext(TodoContext);
    const [currentlyEditing, setCurrentlyEditing] = useState<TodoItem|undefined>();

    return (
        <>
            <Stack sx={{width: '100%', height: '100%'}}>
                <Typography variant="h1">TODO LIST</Typography>
                <Button onClick={() => setCurrentlyEditing(new TodoItem())}>ADD NEW</Button>
                <Stack gap={"15px"} alignItems={"center"}>
                    {todoStore?.todoItems.map(item => (
                        <TodoListItem 
                            key={item.id} 
                            item={item} 
                            onEditRequest={(item) => setCurrentlyEditing(item)} 
                            onDeleteRequest={(item) => {todoStore.remove(item)}}
                        />
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
                            itemForEdit={currentlyEditing}
                            afterSubmit={() => setCurrentlyEditing(undefined)}
                        />
                    </div>
                </Modal>
            }
        </>
    );
});

export default TodoList;