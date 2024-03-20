import {Button, Container} from "@mui/material";
import React from "react";
import {CollectionTree} from "../components/CollectionTree";

export default function New() {
    const [collection, setCollection] = React.useState();
    const [recording, setRecording] = React.useState(false)
    return (
        <Container sx={{
            paddingY: '1rem'
        }}>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    onChange={(e) => {
                        if (!e.target.files) return
                        const file = e.target.files[0]
                        if (!file) return
                        // read json file
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            const text = e.target?.result
                            if (typeof text === 'string') {
                                const data = JSON.parse(text)
                                setCollection(data)
                            }
                        }
                        reader.readAsText(file)
                    }}
                    accept="application/json"
                    hidden
                />
            </Button>
            {collection && <Button
                onClick={async () => {
                    setRecording(true)
                    await fetch('/api/record', {
                        method: 'POST',
                        body: JSON.stringify(collection)
                    })
                    setRecording(false)
                }}
                disabled={recording}
            >
                Start Recording
            </Button>}
            {collection && <CollectionTree collectionData={collection}/>}
        </Container>
    )
}
