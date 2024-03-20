import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import React, {useContext} from "react";
import {useRouter} from "next/router";
import {EndpointServiceContext} from "../providers/EndpointServiceProvider";

export const Navbar = () => {
    const router = useRouter();
    const {data, setData} = useContext(EndpointServiceContext)
    return (
        <AppBar position="static" sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: '1rem'
        }}>
            <Toolbar>
                <Typography>Monitor</Typography>
            </Toolbar>
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '35rem'
            }}>
                <Button variant={"contained"} color={"info"} onClick={async ()=>{
                    await fetch('/api/clear-endpoints')
                    setData({
                        ...data,
                        allEndPoints: [],
                        mapping: []
                    })
                }}>
                    <Typography>Clear Endpoints</Typography>
                </Button>
                <Button variant={"contained"} color={"info"} onClick={async ()=>{
                    await fetch('/api/clear-servers')
                    setData({
                        ...data,
                        allServices: [],
                        mapping: []
                    })
                }}>
                    <Typography>Clear Servers</Typography>
                </Button>
                <Button variant={"contained"} color={"info"} onClick={async ()=>{
                    await router.push('/new')
                }}>
                    <Typography>New</Typography>
                </Button>
                <Button variant={"contained"} color={"info"} onClick={async ()=>{
                    await router.push('/')
                }}>
                    <Typography>Home</Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
}