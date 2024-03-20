import React, {createContext} from "react";
type EndpointService = {
    allEndPoints: string[],
    allServices: string[],
    mapping: {
        endpoint: string,
        services: string[]
    }[],
    graph: {
        source: string,
        target: string,
        weight: number
    }[]
}
export const EndpointServiceContext = createContext<{
    data: EndpointService,
    setData: (data: EndpointService) => void
}>({
    data: {
        allEndPoints: [],
        allServices: [],
        mapping: [],
        graph: []
    }, setData: (data: EndpointService) => {}
})

export const EndpointServiceProvider = ({children}:any) => {
    const [data, setData] = React.useState<EndpointService>({
        allEndPoints: [],
        allServices: [],
        mapping: [],
        graph: []
    })

    return <EndpointServiceContext.Provider value={{data, setData}}>
        {children}
    </EndpointServiceContext.Provider>
}