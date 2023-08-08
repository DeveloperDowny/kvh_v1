import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setIsOpen2, setShouldShowSideBar } from "../reducers/SiteCustom";
import APIRequests from "../api";
import ReportComponent from "./Report";
import { EthImg } from "../assets";
import { useSelector } from "react-redux";

const forGraphTypeToImgMap = {
  btc: "/bitcoin_logo.png",
  eth: "/ethereum_logo.png",
  xmr: "/xmr_img.png",
  ada: "/ada_img.png",
  tro: "/tron_logo.png",
  sol: "/solana_logo.png",
  ton: "/ton_icon.png",
  unk: "/question_mark.png",
};
const GraphVisualization = () => {
  const dispatch = useAppDispatch();
  const { board_id } = useParams();
  console.log("board_id:", board_id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const cryptoAddress = useSelector((state) => state.siteCustom.address);

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
    // "0xb432A953f21174Af1ADf0620Ce65B4c3bDb21427" //issues with tron only
    // "0xb432A953f21174Af1ADf0620Ce65B4c3bDb21427"
    ""
  ); // Replace this with your special ID
  const [hoveredId, setHoveredId] = useState(specialId);
  // const showResults = queryParams.get("show_results");
  // Sample graph data in visjs format

  useEffect(() => {
    dispatch(setShouldShowSideBar(false));
  }, []);

  useEffect(() => {
    APIRequests.explore(specialId)
      .catch((err) => {
        console.log("err in explore:", err);
      })
      .then((res) => {
        if (!res) return;
        console.log("res:", res);
        if (!res.data) return;
        console.log("res.data:", res.data);
        if (!res.data.data) return;
        console.log("res.data.data:", res.data.data);
        if (!res.data.data.data) return;
        console.log("res.data.data.data:", res.data.data.data);
        setData(res.data.data.data.txs);
        dispatch(setIsOpen2(true));
      });
  }, [cryptoAddress]);

  useEffect(() => {
    console.log("dataffsdf:", data);
  }, [data]);

  useEffect(() => {
    dispatch(setShouldShowSideBar(true));
  }, []);

  const cryptoType = useSelector((state) => state.siteCustom.mCryptoType);

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
          // label: "Add",
          label: to,
          // image: EthImg,
          // image: "https://cdn-images-1.medium.com/max/529/1*XmHUL5DeySv_dGmvbPqdDQ.png",
          // image: process.env.PUBLIC_URL + "/bitcoin_img.png",
          image:
            process.env.PUBLIC_URL + forGraphTypeToImgMap[cryptoType || "unk"],

          shape: "image",
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
          // label: "Add",
          shape: "image",

          label: from,
          // image: EthImg,
          // image: "https://cdn-images-1.medium.com/max/529/1*XmHUL5DeySv_dGmvbPqdDQ.png",
          image:
            // process.env.PUBLIC_URL + "/bitcoin_img.png",
            process.env.PUBLIC_URL + forGraphTypeToImgMap[cryptoType || "unk"],

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
  }, [data]);

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
    if (!event.nodes[0]) return;
    console.log("Node clicked:", event.nodes[0]);

    dispatch(setIsOpen2(false));
    setHoveredId(event.nodes[0]);
    dispatch(setIsOpen2(true));
  }

  // const options = {
  //   nodes: {
  //     shape: "image",
  //     image: (
  //       nodeId,
  //       canvasContext,
  //       nodePosition,
  //       nodeSize,
  //       nodeLabel,
  //       nodeColor
  //     ) => {
  //       const node = graphData.nodes.find((n) => n.id === nodeId);
  //       const image = new Image();
  //       console.log("node:", node);
  //       console.log("image:", image);
  //       image.src = node.image;
  //       image.onload = () => {
  //         canvasContext.drawImage(
  //           image,
  //           nodePosition.x - nodeSize.width / 2,
  //           nodePosition.y - nodeSize.height / 2,
  //           nodeSize.width,
  //           nodeSize.height
  //         );
  //       };
  //     },
  //   },
  // };

  useEffect(() => {
    setSpecialId(cryptoAddress);
    setHoveredId(cryptoAddress);
  }, [cryptoAddress]);

  return (
    <div className="t-h-screen t-flex">
      <Graph
        graph={graphData}
        // options={{
        //   nodes: {
        //     size: 42,
        //   },
        //   interaction: { hover: true },
        //   physics: {
        //     enabled: false,
        //   },
        // }}

        options={{
          nodes: {
            borderWidth: 0,
            size: 42,
            color: {
              border: "#222",
              background: "transparent",
            },
            font: {
              color: "#111",
              face: "Walter Turncoat",
              size: 16,
              strokeWidth: 1,
              strokeColor: "#222",
            },
          },
          edges: {
            color: {
              color: "#CCC",
              highlight: "#A22",
            },
            width: 3,
            length: 275,
            hoverWidth: 0.05,
          },
        }}
        // options={{
        //   nodes: {
        //     shape: "image",
        //   },
        // }}
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

// different have different formats
