import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setShouldShowSideBar } from "../reducers/SiteCustom";
import APIRequests from "../api";

const GraphVisualization = () => {
  const dispatch = useAppDispatch();
  const { board_id } = useParams();
  console.log("board_id:", board_id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [data, setData] = React.useState(null);
  const [graphData, setGraphData] = useState({
    nodes: [],
    edges: [],
  });

  const [specialId, setSpecialId] = useState(
    "0x1111111254eeb25477b68fb85ed929f73a960582"
  ); // Replace this with your special ID
  // const showResults = queryParams.get("show_results");
  // Sample graph data in visjs format

  useEffect(() => {
    dispatch(setShouldShowSideBar(false));
  }, []);

  useEffect(() => {
    APIRequests.explore(specialId).then((res) => {
      // console.log("res", res)
      console.log("data", res.data.data);
      setData(res.data.data);
      console.log("red data of exploer", res.data.data);
    });
  }, []);

  // useEffect(() => {
  //   const nodeArr = [];
  //   const edgeArr = [];
  //   const nodeSet = new Set();
  //   const edgeSet = new Set();
  //   console.log("mtransData:", mtransData.data.items);
  //   for (let index in mtransData.data.items) {
  //     // Rest of the code...

  //     if (!nodeSet.has(toAddress)) {
  //       nodeArr.push({
  //         id: toAddress,
  //         label: "Add",
  //         x: specialId === toAddress ? 0 : -200, // Position nodes sending money to specialId on the left
  //         color: specialId === toAddress ? "red" : undefined,
  //       });

  //       nodeSet.add(toAddress);
  //     }

  //     if (!nodeSet.has(fromAddress)) {
  //       nodeArr.push({
  //         id: fromAddress,
  //         label: "Add",
  //         x: specialId === fromAddress ? 0 : 200, // Position nodes receiving money from specialId on the right
  //         color: specialId === fromAddress ? "red" : undefined,
  //       });
  //       nodeSet.add(fromAddress);
  //     }

  //     // Rest of the code...
  //   }

  //   // Rest of the code...
  // }, []);

  const graphData2 = {
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
