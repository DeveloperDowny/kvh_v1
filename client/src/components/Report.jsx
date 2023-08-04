import React from "react";
import './Report.css';


import { EditIcon, CopyIcon, CloseIcon } from "@chakra-ui/icons";
import APIRequests from "../api";
import { CircularProgress } from "@chakra-ui/react";

const ReportComponent = ({ open, address, close }) => {

  const [isOpen, setIsOpen] = React.useState(open);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    if (open) {
      setIsOpen(true);
      APIRequests.explore(address).then((res) => {
        console.log("res", res)
        setData(res.data.data);
      });
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  }, [open]);


  if (!isOpen) return null;

  return (
    <div className={`side-bar ${open ? "" : "closed"}`}>
      <TopBar address={address} close={close} data={data} />
      <ReportBody data={data} />
    </div>

  );
};

export default ReportComponent;


const TopBar = ({ address, close, data }) => {
  const [title, setTitle] = React.useState("Untitled");
  // get title from db if required
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef(null);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current.style.width = `${title.length}ch`;
    }
  }, [title, isEditing]);

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      console.log('Copying to clipboard was successful!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="top-bar">
      <div className="top-bar-1">
        {isEditing ? (
          <input
            type="text"
            ref={inputRef} // Set the ref
            value={title}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`top-bar-title ${isEditing ? "editing" : ""}`}
          />
        ) : (
          <h1 className="top-bar-title">{title}</h1>
        )}
        <EditIcon
          className="top-bar-edit-icon"
          onClick={handleEditClick}
          style={{
            color: "#ffffff",
          }}
        />
        <CloseIcon className="top-bar-close-icon" onClick={close} style={{ color: "#ffffff" }} />
      </div>
      <div className="top-bar-2">
        <p className="top-bar-address">{address}</p>
        <CopyIcon className="top-bar-copy-icon" onClick={handleCopy} style={{
          color: "#ffffff",
        }} />
        {data === null ? (
          <Loader />
        ) : null
        }
      </div>
    </div>
  );
};

const ReportBody = ({ data }) => {
  // if (data != null) { 
  //   console.log("datarbody", data);
  //   console.log("balance", data.balance); 
  
  // }
  data = data == null ? null : data.data;
  let firstDate = "-";
  let lastDate = "-";
  if(data != null) {
    if(data.first != null) {
      firstDate = new Date(data.first);
      // convert to dd/mm/yyyy format string
      firstDate = firstDate.toLocaleDateString();
    }
    if(data.last != null) {
      lastDate = new Date(data.last);

      lastDate = lastDate.toLocaleDateString();
    }
  }

  return (
    <div className="side-bar-body">
      <div className="side-bar-section">
        <h2 className="side-bar-section-title">Balance:</h2>
        <p className="side-bar-section-text">
          {/* 148,377.199 ETH($272,719,065 USD) */}
          {data === null ? (
            <Loader />
          ) : (
            `${data.balance} ${data.network}`
          )}

        </p>
      </div>

      <div className="side-bar-section-main">

        <div className="side-bar-section-sec">
          <h2 className="side-bar-section-title">First Tx: </h2>
          <p className="side-bar-section-text">
            {data === null ? (
              <Loader />
            ): (firstDate)}
          </p>
        </div>
        <div className="side-bar-section-sec">
          <h2 className="side-bar-section-title">Last Tx: </h2>
          <p className="side-bar-section-text"> {data === null ? (
              <Loader />
            ): (lastDate)}</p>
        </div>

      </div>
      <div className="side-bar-section">
        <h2 className="side-bar-section-title">Incoming Volume</h2>
        <p className="side-bar-section-text">1000</p>
      </div>
      <div className="side-bar-section">
        <h2 className="side-bar-section-title">Outgoing Volume</h2>
        <p className="side-bar-section-text">500</p>
      </div>
    </div>
  );
}


const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress isIndeterminate color="white" size={4} />
    </div>
  );
}