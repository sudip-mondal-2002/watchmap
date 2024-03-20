import {Item} from "postman-collection";
import {Container, Typography} from "@mui/material";
import {getMethodColor} from "../libs/getMethodColor";
import {Methods} from "../enums/Methods";

export const PostmanItem = ({item}: { item: Item }) => {
    return (
        <Container sx = {{
            width: 'fit-content',
            margin: 1
        }}>
            <Typography sx={{
                backgroundColor: getMethodColor(item.request.method as Methods),
                display: 'inline',
                marginRight: 1,
                padding: 0.5,
                borderRadius: 1,
            }}>
                {item.request.method}
            </Typography>
            <Typography sx={{
                display: 'inline',
            }}>
                {item.name}
            </Typography>
        </Container>
    )
}