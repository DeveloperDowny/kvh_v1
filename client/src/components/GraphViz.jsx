import React from "react";
import Graph from "react-graph-vis";
import { useLocation, useParams } from "react-router-dom";

const GraphVisualization = () => {
  const { board_id } = useParams();
  console.log("board_id:", board_id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const showResults = queryParams.get("show_results");
  // Sample graph data in visjs format
  const graphData = {
    nodes: [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
    ],
  };

  // Options for graph visualization
  //   const options = {
  //     interaction: { hover: true },
  //   };

  // Define the hoverNode event handler
  const handleNodeHover = (event) => {
    console.log("event:", event);
    console.log("Hovered node:");
    // console.log("Hovered node ID:", event.nodes[0]);

    // Add your custom actions or information display logic here
  };

  return (
    <div className="t-h-screen t-flex">
      <Graph
        graph={graphData}
        options={{
          interaction: { hover: true },
          physics: {
            enabled: false,
          },
        }}
        events={{ hoverNode: handleNodeHover }}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default GraphVisualization;
