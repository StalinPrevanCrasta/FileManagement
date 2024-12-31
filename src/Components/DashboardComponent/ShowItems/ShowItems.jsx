import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import { useDispatch } from "react-redux";

const ShowItems = ({ title, items, type, selectedItems, setSelectedItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDbClick = (item) => {
    if (type === "folder") {
      dispatch(changeFolder(item.docId));
      navigate(`/dashboard/folder/${item.docId}`);
    } else {
      navigate(`/dashboard/file/${item.docId}`);
    }
  };

  const handleSelect = (e, item) => {
    e.stopPropagation();
    if (selectedItems.find(i => i.docId === item.docId)) {
      setSelectedItems(selectedItems.filter(i => i.docId !== item.docId));
    } else {
      setSelectedItems([...selectedItems, { ...item, type }]);
    }
  };

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item) => {
          const itemName = item.data?.name || "Unnamed";
          const itemId = item.docId;
          const isSelected = selectedItems.some(i => i.docId === itemId);

          return (
            <div
              key={itemId}
              className={`col-md-2 py-3 text-center border rounded position-relative ${isSelected ? 'bg-light' : ''}`}
              onDoubleClick={() => handleDbClick(item)}
              onClick={(e) => handleSelect(e, item)}
              style={{ cursor: "pointer" }}
            >
              {isSelected && (
                <div className="position-absolute top-0 end-0 p-2">
                  <FontAwesomeIcon 
                    icon={faCheck} 
                    className="text-success"
                  />
                </div>
              )}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}>
                {type === "folder" ? (
                  <FontAwesomeIcon 
                    icon={faFolder} 
                    size="4x" 
                    className={`text-warning ${isSelected ? 'opacity-75' : ''}`}
                  />
                ) : (
                  <FontAwesomeIcon 
                    icon={faFileAlt} 
                    size="4x" 
                    className={`text-primary ${isSelected ? 'opacity-75' : ''}`}
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
