import { Button, Card, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useContext, useState } from 'react';
import { TodoContext } from "../../../data/contexts/TodoContext";
import TodoItem from "../../../data/models/TodoItem";

type TodoEditFormProps = {
    itemForEdit: TodoItem;
    afterSubmit: () => void;
}

const TodoEditForm = observer(({itemForEdit, afterSubmit}: TodoEditFormProps) => {

    const { todoStore } = useContext(TodoContext);
    const [editClone] = useState(new TodoItem(itemForEdit));

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!!editClone.id) {
            todoStore!.update(editClone);
        } else {
            todoStore!.create(editClone);
        }
        afterSubmit();
    }

    return (
        <Card sx={{width: 500, padding: 2, position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
            <form onSubmit={handleSubmit}>
                <Stack gap={"15px"}>
                    <TextField label="Title" value={editClone.title} onChange={(e) => editClone.setTitle(e.target.value)}/>
                    <TextField label="Description" value={editClone.description} onChange={(e) => editClone.setDescription(e.target.value)}/>
                    <FormControlLabel control={<Checkbox checked={editClone.isDone} onChange={(e) => editClone.setIsDone(e.target.checked)} />} label="Is Done?" />
                    <Button type="submit">SUBMIT</Button>
                </Stack>
            </form>
        </Card>
    );
});

export default TodoEditForm;