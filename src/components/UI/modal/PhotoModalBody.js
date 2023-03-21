import React, { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./PhotoModalBody.css";
import ModalCloseButton from "./ModalCloseButton";
import { UserLoginContext } from "../../../context/Context";

/**
 *
 * @param show boolean
 * @param onClose close button event handler function
 * @param src image url
 * @param onDelete function handler for delete yes click button event
 * @returns
 */
const PhotoModalBody = (props) => {
  const login = useContext(UserLoginContext);
  const [deleteImage, setDeleteImage] = useState(false);

  const animationTiming = {
    enter: 1000,
    exit: 1000,
  };

  const onClickDeleteHandler = (e) => {
    setDeleteImage(true);
  };

  const onClickDeleteNoHandler = (e) => {
    setDeleteImage(false);
  };

  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTiming}
        classNames={{
          enterActive: "PhotoModalOpen",
          exitActive: "PhotoModalClose",
        }}
      >
        <div className="photo-modal-body">
          <div onClick={props.onClose} className="photo-modal-close__button">
            ✖
          </div>
          <div className="photo-modal-body__container">
            <img src={props.src}></img>
          </div>
          {login.user.name === "admin" && !deleteImage ? (
            <div className="photo-modal-body__action">
              <button onClick={onClickDeleteHandler}>Delete</button>
            </div>
          ) : null}
          {deleteImage ? (
            <div className="photo-modal-body-warning__action">
              <p>
                Please make sure that once you delete this image, you cannot
                recover it. Do you really want to delete? 🙄
              </p>
              <div>
                <button onClick={props.onDelete}>Yes</button>
                <button onClick={onClickDeleteNoHandler}>No</button>
              </div>
            </div>
          ) : null}
        </div>
      </CSSTransition>
    </>
  );
};

export default PhotoModalBody;
