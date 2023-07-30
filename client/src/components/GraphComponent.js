// src/GraphComponent.js

import React from "react";
import { Network } from "vis-network";

const GraphComponent = ({ graphData }) => {
  const containerRef = React.useRef(null);
  const networkRef = React.useRef(null);

  //   let options = {
  //     physics: {
  //       barnesHut: {
  //         gravitationalConstant: -2000,
  //         centralGravity: 0.3,
  //         springLength: 200,
  //         springConstant: 0.05,
  //         damping: 0.09,
  //         avoidOverlap: 0.2,
  //       },
  //       stabilization: {
  //         enabled: true,
  //         iterations: 1000,
  //         updateInterval: 50,
  //         onlyDynamicEdges: false,
  //         fit: true,
  //       },
  //     },
  //   };

  const optionsv1 = {
    nodes: {
      shape: "circle",
    },
    edges: {
      color: "orange", // Change the color of links (edges) to orange
      arrows: "to;",
    },
    physics: {
      enabled: false,
    },
  };

  let options = {
    layout: {
      randomSeed: 2,
    },
    nodes: {
      fixed: {
        x: false,
        y: false,
      },
      shape: "dot",
      size: 13,
      borderWidth: 1.5,
      borderWidthSelected: 2,
      font: {
        size: 15,
        align: "center",
        bold: {
          color: "#bbbdc0",
          size: 15,
          vadjust: 0,
          mod: "bold",
        },
      },
    },
    edges: {
      width: 0.01,
      color: {
        color: "#D3D3D3",
        highlight: "#797979",
        hover: "#797979",
        opacity: 1.0,
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" },
        middle: { enabled: false, scaleFactor: 1, type: "arrow" },
        from: { enabled: true, scaleFactor: 1, type: "arrow" },
      },
      smooth: {
        type: "continuous",
        roundness: 0,
      },
    },
    groups: {
      Physics: {
        color: {
          background: "#ffffff",
          border: "#acdbae",
          highlight: {
            border: "#acdbae",
            background: "#ffffff",
          },
          hover: {
            border: "#acdbae",
            background: "#ffffff",
          },
        },
      },
      Chemistry: {
        color: {
          background: "#ffffff",
          border: "#f3bd86",
          highlight: {
            border: "#f3bd86",
            background: "#ffffff",
          },
          hover: {
            border: "#f3bd86",
            background: "#ffffff",
          },
        },
      },
      Biology: {
        color: {
          background: "#ffffff",
          border: "#c89dc8",
          highlight: {
            border: "#c89dc8",
            background: "#ffffff",
          },
          hover: {
            border: "#c89dc8",
            background: "#ffffff",
          },
        },
      },
      Mathematics: {
        color: {
          background: "#ffffff",
          border: "#52CBEC",
          highlight: {
            border: "#52CBEC",
            background: "#ffffff",
          },
          hover: {
            border: "#52CBEC",
            background: "#ffffff",
          },
        },
      },
      English: {
        color: {
          background: "#ffffff",
          border: "#c2b59b",
          highlight: {
            border: "#c2b59b",
            background: "#ffffff",
          },
          hover: {
            border: "#c2b59b",
            background: "#ffffff",
          },
        },
      },
      "Logical Reasoning": {
        color: {
          background: "#ffffff",
          border: "#87a6aa",
          highlight: {
            border: "#87a6aa",
            background: "#ffffff",
          },
          hover: {
            border: "#87a6aa",
            background: "#ffffff",
          },
        },
      },
    },
    // physics: {
    //   forceAtlas2Based: {
    //       gravitationalConstant: -200,
    //       centralGravity: 0.05,
    //       springLength: 230,
    //       springConstant: 0.08,
    //       avoidOverlap:9
    //   },
    //   solver: 'forceAtlas2Based',
    //   timestep: 0.35,
    //   stabilization: {enabled:true,iterations: 10}
    // },
    physics: {
      enabled: false,
      //   barnesHut: {
      //     gravitationalConstant: -30000,
      //     centralGravity: 1,
      //     springLength: 70,
      //     avoidOverlap: 1,
      //   },
      //   stabilization: { iterations: 2500 },
    },
    interaction: {
      hover: true,
    },
    // interaction: {
    //   hover: true,
    //   hoverConnectedEdges: true,
    //   hoverEdges: true,
    //   selectable: false,
    //   selectConnectedEdges: false,
    //   zoomView: false,
    //   dragView: false,
    // },
  };

  // Use useMemo to memoize the Network instance
  //   const network = React.useMemo(() => {
  //     if (!networkRef.current) {
  //       const options = {
  //         layout: {
  //           improvedLayout: false,
  //         },
  //         physics: {
  //           barnesHut: {
  //             gravitationalConstant: -2000,
  //             centralGravity: 0.3,
  //             springLength: 200,
  //             springConstant: 0.05,
  //             damping: 0.09,
  //             avoidOverlap: 0.2,
  //           },
  //           stabilization: {
  //             enabled: true,
  //             iterations: 1000,
  //             updateInterval: 50,
  //             onlyDynamicEdges: false,
  //             fit: true,
  //           },
  //         },
  //       };
  //       networkRef.current = new Network(
  //         containerRef.current,
  //         graphData,
  //         options
  //       );
  //     } else {
  //       networkRef.current.setData(graphData);
  //     }

  //     return networkRef.current;
  //   }, [graphData]);

  React.useEffect(() => {
    if (!networkRef.current) {
      networkRef.current = new Network(
        containerRef.current,
        graphData,
        options
      );
    } else {
      networkRef.current.setData(graphData);
    }
  }, [graphData]);

  return <div ref={containerRef} style={{ height: "500px" }}></div>;
};

export default GraphComponent;
