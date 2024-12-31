import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { changeFolder, moveFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import { useDispatch } from "react-redux";

const ShowItems = ({ title, items, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle double-click event
  const handleDbClick = (item) => {
    if (type === "folder") {
      dispatch(changeFolder(item.docId));
      navigate(`/dashboard/folder/${item.docId}`);
    } else {
      navigate(`/dashboard/file/${item.docId}`);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("folderId", item.docId);
  };

  const handleDrop = (e) => {
    const folderId = e.dataTransfer.getData("folderId");
    const targetFolderId = e.currentTarget.dataset.id; // Assuming you set data-id on the target
    dispatch(moveFolder(folderId, targetFolderId)); // Dispatch moveFolder action
  };

  const iconTextStyle = {
    display: "flex",
    flexDirection: "column",
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
              className="col-md-2 py-3 text-center border rounded"
              onDoubleClick={() => handleDbClick(item)}
              style={{ cursor: "pointer" }}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              data-id={itemId}
            >
              <div style={iconTextStyle}>
                {type === "folder" ? (
                  <FontAwesomeIcon 
                    icon={faFolder} 
                    size="4x" 
                    className="text-warning"
                  />
                ) : (
                  <FontAwesomeIcon 
                    icon={faFileAlt} 
                    size="4x" 
                    className="text-primary"
                  />
                )}
                <span className="mt-2">{itemName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
