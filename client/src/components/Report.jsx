import React from "react";
import "./Report.css";

import { EditIcon, CopyIcon, CloseIcon, CheckIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import APIRequests from "../api";
import { CircularProgress } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  TableCaption,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen2 } from "../reducers/SiteCustom";





const ReportComponent = ({ open, address, close }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(open);

  const isOpen2 = useSelector((state) => state.siteCustom.isOpen2);
  const [data, setData] = React.useState(null);
  const [riskData, setRisk] = React.useState(null);
  // const { isMaximized } = React.useContext(ReportSizeContext);
  const [isMaximized, setIsMaximized] = React.useState(false);

  const mfetchData = async () => {
    if (isOpen2 && address) {
      setIsOpen(true);

      const res = await APIRequests.explore(address).catch((err) => {
        console.log("error", err);
      });

      if (!res) return;
      console.log("res", res);

      console.log("data", res.data.data);
      setData(res.data.data);
      console.log("red data", res.data.data);

      const res2 = await APIRequests.getRisk(address).catch((err) => {
        console.log("error in risk", err);
        setRisk(null);
      });

      if (!res2) return;

      console.log("risk2", res2.data);
      setRisk(res2.data);
    } else {
      setData(null);
      setRisk(null);
      setTimeout(() => {
        setIsOpen(false);
        dispatch(setIsOpen2(false));
      }, 500);
    }

    console.log("here is report open: ", isOpen2);
  };

  React.useEffect(() => {
    mfetchData();
  }, [open, address, isOpen2]);

  if (!isOpen2) return null;
  console.log("max", isMaximized)
  return (
    // <div className={`side-bar ${open ? "" : "closed"}`}>
    // <div className={`side-bar ${open ? "" : "closed"}`}>
    // <div className={`side-bar ${isOpen2 ? "" : "closed"}`}>
    <div className={`side-bar ${isOpen2 ? "" : "closed"} ${isMaximized ? "maximized" : ""}`}>

      <TopBar address={address} close={close} data={data} isMaximized={isMaximized}
        setIsMaximized={setIsMaximized} />
      <ReportBody data={data} risk={riskData} />
    </div>
  );
};

export default ReportComponent;

const TopBar = ({ address, close, data }) => {
  const mainAdd = useSelector((state) => state.siteCustom.address);
  const [title, setTitle] = React.useState("Loading...");
  const [isEditing, setIsEditing] = React.useState(false);
  const [tempTitle, setTempTitle] = React.useState(""); // temporary title when editing

  const [isOpen, setIsOpen] = React.useState(false);


  const inputRef = React.useRef(null);

  const handleEditClick = () => {
    setTempTitle(title);
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    setIsEditing(false);
    console.log("canceling, old title: ", tempTitle);
    setTitle((prev) => (prev = tempTitle));
  };

  const handleSave = async () => {
    setIsEditing(false);
    const res = await APIRequests.changeTitle(address, {
      title: title,
      board_id: mainAdd,
    });

    console.log("update res", res);
    if (res.status === 200) {
      console.log("success");
    } else {
      setTitle((prev) => (prev = tempTitle));
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  // on change of title is completed, update db

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current.style.width = `${title.length}ch`;
    }
  }, [title, isEditing]);

  React.useEffect(() => {
    if (data) {
      setTitle(data.title);
      setTempTitle(data.title);
    } else {
      setTitle("Loading...");
    }
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(
      () => {
        console.log("Copying to clipboard was successful!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="top-bar">

      <div className="top-bar-1">
        {isEditing ? (
          <React.Fragment>
            <input
              type="text"
              ref={inputRef}
              value={title}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`top-bar-title ${isEditing ? "editing" : ""}`}
            />
            <CheckIcon
              className="top-bar-check-icon"
              onClick={handleSave}
              style={{ color: "#ffffff", marginRight: "4px" }}
            />
            <CloseIcon
              className="top-bar-cross-icon"
              onClick={handleCancel}
              style={{ color: "#ffffff", width: "12px" }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button className="top-bar-add-icon" style={{
              width: "10px",
            }} onClick={() => setIsOpen(true)} width={2} padding={0} height={4}>
              +
            </Button>
            <h1 className="top-bar-title">{title}</h1>
            <EditIcon
              className="top-bar-edit-icon"
              onClick={handleEditClick}
              style={{
                color: "#ffffff",
              }}
            />
            <div className='top-bar-right'>
              <PlusSquareIcon
                className="top-bar-max-icon"
                // onClick= {}
                onClick={() => setIsMaximized(!isMaximized)}
                width={10}
                height={5}
                style={{ color: "#ffffff" }}
              />
              <CloseIcon
                className="top-bar-close-icon"
                onClick={close}
                style={{ color: "#ffffff" }}
              />
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="top-bar-2">
        <p className="top-bar-address">{address}</p>
        <CopyIcon
          className="top-bar-copy-icon"
          onClick={handleCopy}
          style={{
            color: "#ffffff",
          }}
        />
        {data === null || data === undefined ? <Loader /> : null}
      </div>
    </div>
  );
};

const ReportBody = ({ data, risk }) => {
  data = data == null ? null : data.data;

  let firstDate = "-";
  let lastDate = "-";
  if (data != null) {
    if (data.first != null) {
      firstDate = new Date(data.first);
      firstDate = firstDate.toLocaleDateString();
    }
    if (data.last != null) {
      lastDate = new Date(data.last);

      lastDate = lastDate.toLocaleDateString();
    }
  }

  const [exRate, setExRate] = React.useState(null);

  React.useEffect(() => {
    // call api to get balance in INR
    // data = data == null ? null : data.data;
    if (data != null) {
      APIRequests.getExchangeRate(data.network, "inr")
        .then((res) => {
          // console.log("ex rate", res.data.exRate);
          setExRate(res.data.exRate);
        })
        .catch((err) => {
          setExRate(null);
        });
    }
  }, [data]);

  // const cRisk = risk == null ? null : risk.riskScores.combinedRisk.toFixed(2) + "%";

  return (
    <div className="side-bar-body">
      <div className="side-bar-section">
        <h2 className="side-bar-section-title">Balance:</h2>

        {data === null || data === undefined ? (
          <Loader />
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="side-bar-section-text">
              {`${parseFloat(data.balance).toFixed(4)} ${data.network}`}
            </p>
            {exRate !== null && (
              <>
                <div style={{ margin: "0 10px" }}>|</div>
                <p className="side-bar-section-text">
                  {`INR ${parseFloat(data.balance * exRate).toFixed(4)}`}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {data?.first && data.last && (
        <div className="side-bar-section-main">
          {data?.first && (
            <div className="side-bar-section-sec">
              <h2 className="side-bar-section-title">First Tx: </h2>
              <p className="side-bar-section-text">
                {data === null || data === undefined ? <Loader /> : firstDate}
              </p>
            </div>
          )}
          {data?.last && (
            <div className="side-bar-section-sec">
              <h2 className="side-bar-section-title">Last Tx: </h2>
              <p className="side-bar-section-text">
                {" "}
                {data.last ?? <Loader />}
              </p>
            </div>
          )}
        </div>
      )}
      <div className="side-bar-section">
        <h2 className="side-bar-section-title">Incoming Volume</h2>
        {data === null || data === undefined ? (
          <Loader />
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="side-bar-section-text">
              {`${parseFloat(data.receive).toFixed(4)} ${data.network}`}
            </p>
            {/* {exRate !== null && (
              <>
                <div style={{ margin: "0 10px" }}>|</div>
                <p className="side-bar-section-text">
                  {`INR ${parseFloat(data.receive * exRate).toFixed(4)}`}
                </p>
              </>
            )} */}
          </div>
        )}
      </div>

      <div className="side-bar-section">
        <h2 className="side-bar-section-title">Outgoing Volume</h2>
        {data === null || data === undefined ? (
          <Loader />
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="side-bar-section-text">
              {`${parseFloat(data.spend).toFixed(4) * -1} ${data.network}`}
            </p>
            {/* {exRate !== null && (
              <>
                <div style={{ margin: "0 10px" }}>|</div>
                <p className="side-bar-section-text">
                  {`INR ${parseFloat(data.spend * exRate).toFixed(4) * -1}`}
                </p>
              </>
            )} */}
          </div>
        )}
      </div>

      {risk != null && (
        <div>
          <div className="side-bar-section-main">
            <div className="side-bar-section-sec">
              <h2 className="side-bar-section-title">Combined Risk:</h2>
              <p className="side-bar-section-text">
                {risk === null || data === undefined ? (
                  // <Loader />
                  <div>-</div>
                ) : (
                  // set a timeout here maybe?
                  risk.riskScores.combinedRisk.toFixed(2) + "%"
                )}
              </p>
            </div>
            <div className="side-bar-section-sec">
              <h2 className="side-bar-section-title">Fraud Risk:</h2>
              <p className="side-bar-section-text">
                {risk === null || data === undefined ? (
                  // <Loader />
                  <div>-</div>
                ) : (
                  risk.riskScores.fraudRisk.toFixed(2) + "%"
                )}
              </p>
            </div>
          </div>

          <div className="side-bar-section-main">
            <div className="side-bar-section-sec">
              <h2 className="side-bar-section-title">Lending Risk:</h2>
              <p className="side-bar-section-text">
                {risk === null || data === undefined ? (
                  // <Loader />
                  <div>-</div>
                ) : (
                  risk.riskScores.lendingRisk.toFixed(2) + "%"
                )}
              </p>
            </div>
            <div className="side-bar-section-sec">
              <h2 className="side-bar-section-title">Reputation Risk:</h2>
              <p className="side-bar-section-text">
                {risk === null || data === undefined ? (
                  // <Loader />
                  <div>-</div>
                ) : (
                  risk.riskScores.reputationRisk.toFixed(2) + "%"
                )}
              </p>
            </div>
          </div>
        </div>
      )}
      {risk && risk.reasons.length > 0 && (
        <div className="side-bar-section-2">
          <h2 className="side-bar-section-title">Risk Reasons:</h2>
          {risk.reasons.map((reason, index) => (
            <div key={index}>{renderRiskReason(reason, index + 1)}</div>
          ))}
        </div>
      )}
      {data && (
        // data.txs && undefined &&
        <TransactionsTable txs={data.txs} />
      )}
    </div>
  );
};

const renderRiskReason = (reason, index) => {
  return (
    <div className="risk-reason">
      <h4
        className="risk-reason-title"
        style={{
          fontSize: "14px",
        }}
      >
        {index}. {reason.explanation}
      </h4>
    </div>
  );
};

const TransactionsTable = ({ txs }) => {
  if (!txs || txs.length === 0) {
    return (
      <Box p={5}>
        <Text>No transactions found.</Text>
      </Box>
    );
  }

  return (
    <Box overflowY="auto" marginBottom={180} width="100%">

      <Table
        variant="striped"
        colorScheme="messenger"
        padding={0}
        size="sm"
        width="100%"
      >
        <TableCaption
          style={{
            textAlign: "center",
            padding: "5px 0px 0px 0px",
            margin: 0,
          }}
          placement="top"
          fontSize={14}
        >
          Transactions
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">Date</Th>
            <Th textAlign="center">Receiver</Th>
            <Th textAlign="center">Amount</Th>
          </Tr>
        </Thead>
        <Tbody padding={0} whiteSpace={0} columnGap={0}>  
          {txs.map((tx, index) => {
            // tx.time (ms to epoch)

            // convert to dd/mm/yyyy format string
            var time = new Date(tx.time * 1000); // JavaScript uses milliseconds
            time = time.toLocaleDateString();

            let recv = tx.to;
            if (tx.network === "BTC") {
              recv = tx.outputs[0].address;
            }

            let val = tx.value;
            if (tx.network === "BTC") {
              val = tx.outputs[0].value;
            }

            return (
              <Tr key={index}>
                <Td isNumeric>
                  <Text isTruncated fontSize={12}>
                    {time}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text isTruncated fontSize={12}>
                    {recv}
                  </Text>
                </Td>
                <Td isNumeric fontSize={12}>
                  {val} {tx.network}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress isIndeterminate color="blue" size={4} />
    </div>
  );
};
