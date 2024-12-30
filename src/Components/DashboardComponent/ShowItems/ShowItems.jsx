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
      dispatch(changeFolder(item.userId));
      // Navigate to folder and show the folder details with userId
      navigate(`/dashboard/folder/${item.userId}`);  // You can pass `userId` if you want to show it in the URL or use it in another way
      alert(`Folder clicked! User ID: ${item.userId}`);
    } else {
      alert("File clicked");
    }
  };

  const iconTextStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px", // Adds spacing between the icon and text
  };

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item, index) => {
          // Log the item to check its structure
          console.log("Item structure:", item);

          // Get the name from the item (ensure the correct path based on the structure)
          const itemName = item.name || item.data?.name || item.fileName; // Adjust based on actual structure

          // If name is missing, log the error and display a placeholder
          if (!itemName) {
            console.error("Missing folder or file name for item:", item);
          }

          // Use itemId or docId as a unique key
          const itemId = item.docId || index; // Use item.docId if available, else fallback to index

          return (
            <p
              key={itemId} // Use itemId as the key
              className="col-md-2 py-3 text-center border d-flex flex-column align-items-center"
              onDoubleClick={() => handleDbClick(item)} // Pass the entire item to the function
            >
              <div style={iconTextStyle}>
                {type === "folder" ? (
                  <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
                ) : (
                  <FontAwesomeIcon icon={faFileAlt} size="4x" className="mb-3" />
                )}
                <span>{itemName || "Unnamed Item"}</span> {/* Display folder/file name */}
              </div>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
