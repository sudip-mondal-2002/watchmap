import Graph from "graphology";
import {SigmaContainer, useLoadGraph} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import {useLayoutForceAtlas2} from "@react-sigma/layout-forceatlas2";

type GraphData = {
    source: string;
    target: string;
    weight: number;
}[]
export const LoadGraph = ({data}:{
    data : GraphData
}) => {
    const graph = new Graph({
        multi: true,
        type: "undirected",
    });
    const { assign } = useLayoutForceAtlas2({
        settings: {
            strongGravityMode: true,
            edgeWeightInfluence: 0.17,
        },
        iterations: 1000,
    });
    const nodes = new Set<string>(data.map(({source, target}) => [source, target]).flat());
    nodes.forEach(node => graph.addNode(node, {x: Math.random(), y: Math.random(), size: 10, label: node}));
    data.forEach(({source, target, weight}) => {
        graph.addEdge(source, target,{
            size: Math.floor(weight * 50),
            label: `${source}<->${target} : ${Math.floor(weight*100)/100}`,
            weight: 50/weight
        });
    });
    useLoadGraph()(graph);
    assign();
    return null;
};

const DisplayGraph = ({graph}:{
    graph: GraphData
}) => {
    return (<>
        {graph.length ? <SigmaContainer style={{height: "500px", width: "100%"}} settings={{
            edgeLabelSize: 15,
            labelSize: 15,
            renderEdgeLabels: true,
            defaultNodeColor: "#ec5148",
            defaultEdgeColor: "#51aaec",
        }}>
            <LoadGraph data={graph} />
        </SigmaContainer>: null}
        </>
    );
};

export default DisplayGraph;

