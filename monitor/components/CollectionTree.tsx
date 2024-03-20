import {Collection, Item, ItemGroup} from "postman-collection";
import React, {useMemo} from "react";
import {PostmanFolder} from "./PostmanFolder";

export const CollectionTree = ({collectionData}: { collectionData: any }) => {
    const collection = useMemo(() => new Collection(collectionData), [collectionData])
    return (
        <div>
            <PostmanFolder folder={collection} />
        </div>
    )
}