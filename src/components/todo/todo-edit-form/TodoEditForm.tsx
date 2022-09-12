import { Button, Card, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { observer } from "mobx-react-lite";
import { TodoEditFormState } from "./TodoEditFormState";

type TodoEditFormProps = {
    formState: TodoEditFormState;
    afterSubmit: () => void;
}

const TodoEditForm = observer(({formState, afterSubmit}: TodoEditFormProps) => {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        formState.save();
        afterSubmit();
    }

    return (
        <Card sx={{width: 500, padding: 2, position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
            <form onSubmit={handleSubmit}>
                <Stack gap={"15px"}>
                    <TextField label="Title" value={formState.editClone.title} onChange={(e) => formState.editClone.setTitle(e.target.value)}/>
                    <TextField label="Description" value={formState.editClone.description} onChange={(e) => formState.editClone.setDescription(e.target.value)}/>
                    <FormControlLabel control={<Checkbox checked={formState.editClone.isDone} onChange={(e) => formState.editClone.setIsDone(e.target.checked)} />} label="Is Done?" />
                    <Button type="submit">SUBMIT</Button>
                </Stack>
            </form>
        </Card>
    );
});

export default TodoEditForm;