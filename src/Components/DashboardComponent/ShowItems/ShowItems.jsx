import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ShowItems = ({ title, items, type }) => {
  const navigate = useNavigate();

  const handledbClick = (itemId) => {
    if (type === "folder") {
      navigate(`/dashboard/folder/${itemId}`); // Navigate to folder route
    } else {
      alert("File clicked!");
    }
  };

  const iconTextStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item, index) => {
          const itemName = item?.data?.name || "Unnamed Item"; 
          const itemId = item?.docId || `undefined-${index}`; 

          return (
            <p
              key={index * 55}
              className="col-md-2 py-3 text-center border d-flex flex-column align-items-center"
              onDoubleClick={() => handledbClick(itemId)}
            >
              <div style={iconTextStyle}>
                {type === "folder" ? (
                  <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
                ) : (
                  <FontAwesomeIcon icon={faFileAlt} size="4x" className="mb-3" />
                )}
                <span>{itemName}</span>
              </div>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
