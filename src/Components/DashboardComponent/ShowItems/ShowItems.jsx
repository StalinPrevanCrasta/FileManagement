import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import { useDispatch } from "react-redux";

const ShowItems = ({ title, items, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Function to handle double-click event
  const handleDbClick = (item) => {
    if (type === "folder") {
      dispatch(changeFolder(item.docId));
      // Navigate to the folder using its docId instead of name
      navigate(`/dashboard/folder/${item.docId}`);
    } else {
      alert("File clicked");
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
        {items.map((item) => {
          const itemName = item.data?.name || "Unnamed";
          const itemId = item.docId;

          return (
            <div
              key={itemId}
              className="col-md-2 py-3 text-center border d-flex flex-column align-items-center"
              onDoubleClick={() => handleDbClick(item)}
            >
              <div style={iconTextStyle}>
                {type === "folder" ? (
                  <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3 text-warning" />
                ) : (
                  <FontAwesomeIcon icon={faFileAlt} size="4x" className="mb-3" />
                )}
                <span>{itemName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;

