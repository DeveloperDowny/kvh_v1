import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setIsOpen2, setShouldShowSideBar } from "../reducers/SiteCustom";
import APIRequests from "../api";
import ReportComponent from "./Report";

const GraphVisualization = () => {
  const dispatch = useAppDispatch();
  const { board_id } = useParams();
  console.log("board_id:", board_id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [data, setData] = useState(null);
  const [graphData, setGraphData] = useState({
    nodes: [],
    edges: [],
  });

  const [open, setOpen] = useState(true);

  const closeSideBar = () => {
    setOpen(false);
    dispatch(setIsOpen2(false));
  };

  const [specialId, setSpecialId] = useState(
    "TRpn2AWwXLfYSVtRaxKGm5oMCPvrRyvBJv"
  ); // Replace this with your special ID
  const [hoveredId, setHoveredId] = useState(specialId);
  // const showResults = queryParams.get("show_results");
  // Sample graph data in visjs format

  useEffect(() => {
    dispatch(setShouldShowSideBar(false));
  }, []);

  useEffect(() => {
    APIRequests.explore(specialId).then((res) => {
      setData(res.data.data.data.txs);
      dispatch(setIsOpen2(true));
    });
  }, []);

  useEffect(() => {
    console.log("dataffsdf:", data);
  }, [data]);

  useEffect(() => {
    dispatch(setShouldShowSideBar(true));
  }, []);

  useEffect(() => {
    if (!data) return;
    const nodeArr = [];
    const edgeArr = [];
    const nodeSet = new Set();
    const edgeSet = new Set();
    let specialIndex = 0; // Index of the specialId in the data array
    // let yPos = 0; // Initialize y position
    let yPos = -100; // Initialize y position
    const incrementCont = 20; // Increment y position by 100 for each node
    console.log("mtransData:", data);
    for (let index in data) {
      // if (specialId === data[index].to || specialId === data[index].from) {
      //   specialIndex = index;
      // }
      const arrayData = data[index];
      console.log("arrayData:", arrayData);
      const from = arrayData.from;
      const to = arrayData.to;
      // Rest of the code...

      edgeArr.push({
        from: from,
        to: to,
        // label: transactionAddress,
      });
      if (!nodeSet.has(to)) {
        nodeArr.push({
          id: to,
          label: "Add",
          x: specialId === to ? 0 : 200, // Position nodes sending money to specialId on the left
          y: yPos,
          color: specialId === to ? "red" : undefined,
        });
        if (specialId === to) {
          specialIndex = index;
          console.log("specialIndex:", specialIndex);
        }

        nodeSet.add(to);
        yPos += incrementCont;
      }

      if (!nodeSet.has(from)) {
        nodeArr.push({
          id: from,
          label: "Add",
          x: specialId === from ? 0 : -200, // Position nodes receiving money from specialId on the right
          y: yPos,
          color: specialId === from ? "red" : undefined,
        });

        if (specialId === from) {
          specialIndex = index;
          console.log("specialIndex:", specialIndex);
        }

        nodeSet.add(from);
        yPos += incrementCont;
      }
      edgeSet.add({
        from: from,
        to: to,
        label: "m",
      });

      // Rest of the code...
    }

    const calcY = yPos / 2;
    console.log("yPos:", yPos);
    console.log("calcY:", calcY);
    const specialIdData = nodeArr[specialIndex];
    console.log("specialIdData:", specialIdData);
    nodeArr[specialIndex] = { ...specialIdData, y: calcY };
    console.log("nodeArr:", nodeArr[specialIndex]);

    setGraphData({
      nodes: nodeArr,
      edges: edgeArr,
    });

    console.log("graphData:", {
      nodes: nodeArr,
      edges: edgeArr,
    });
    // Rest of the code...
  }, [data]);

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
    // console.log("event:", event);
    // console.log("Hovered node:");
    // dispatch(setIsOpen2(false));
    // setTimeout(() => {
    //   setHoveredId(event.node);
    //   dispatch(setIsOpen2(true));
    // }, 1000);
    // console.log("Hovered node ID:", event.nodes[0]);
    // Add your custom actions or information display logic here
  };

  function handleNodeClick(event) {
    // Perform actions like showing more information about the node, updating state, etc.
    console.log("Node clicked:", event.nodes[0]);

    dispatch(setIsOpen2(false));
    setTimeout(() => {
      setHoveredId(event.nodes[0]);
      dispatch(setIsOpen2(true));
    }, 1000);
  }

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
        events={{
          hoverNode: handleNodeHover,
          click: (event) => {
            handleNodeClick(event);
          },
        }}
        style={{ height: "100%" }}
      />

      <ReportComponent open={open} address={hoveredId} close={closeSideBar} />
    </div>
  );
};

export default GraphVisualization;
