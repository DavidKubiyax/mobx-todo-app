import { Card, Checkbox, Icon, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { observer } from "mobx-react";
import TodoItem from "../../TodoItem";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type TodoListItemProps = {
    item: TodoItem;
    onDeleteRequest: (item: TodoItem) => void;
    onEditRequest: (item: TodoItem) => void;
}

const TodoListItem = observer(({item, onDeleteRequest, onEditRequest}: TodoListItemProps) => {
    return (
        <Card sx={{width: 500, height: 50}}>
            <Stack direction={"row"} gap={"10px"}>
                <Checkbox checked={item.isDone} onChange={(e) => item.setIsDone(e.target.checked)}/>
                <Stack>
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography variant="caption">{item.description}</Typography>
                </Stack>
                <IconButton onClick={() => onEditRequest(item)}>
                    <EditIcon color="action"/>
                </IconButton>
                <IconButton onClick={() => onDeleteRequest(item)}>
                    <DeleteIcon color="error"/>
                </IconButton>
            </Stack>
        </Card>
    );
});

export default TodoListItem;