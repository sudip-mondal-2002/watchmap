import {Item, ItemGroup} from "postman-collection";
import {PostmanItem} from "./PostmanItem";
import React from "react";
import {Container, Typography} from "@mui/material";

export const PostmanFolder = ({folder}: { folder: ItemGroup<Item> }) => {
    return (
        <Container sx={{
            backgroundColor: '#0002',
            paddingY: 1,
            borderRadius: 1
        }}>
            <Typography>{folder.name}</Typography>
            {folder.items.map((item) => {
                return <Container key={item.id}>
                    {(item instanceof Item) && <PostmanItem item={item}/>}
                    {(item instanceof ItemGroup) && <PostmanFolder folder={item}/>}
                </Container>
            })}
        </Container>
    )
}