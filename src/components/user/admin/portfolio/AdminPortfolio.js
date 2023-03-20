import React, { useState } from "react";
import CardContainer from "../../../UI/containers/CardContainer";
import FormHeading from "../../../UI/form/FormHeading";
import Modal from "../../../UI/modal/Modal";
import UploadSVG from "../../../UI/SVG/UploadSVG";
import "./AdminPortfolio.css";
const AdminPortfolio = (props) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onChangeImageFilesHandler = (e) => {
    const files = e.target.files;
    setImageFiles([...files]);
  };

  const onClickShowPhotoUploadModal = (e) => {
    setShowModal(true);
  };

  const onCloseModalHandler = (e) => {
    setShowModal(false);
  };

  const onClickRemoveQueuedImageHandler = (event, imageIndex) => {
    let imagesArray = [...imageFiles];
    imagesArray.splice(imageIndex, 1);
    setImageFiles([...imagesArray]);
  };

  const onClickUploadPortfolioImagesHandler = async (e) => {
    if (imageFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("portfolioImages", imageFiles[i]);
      }

      await fetch("http://localhost:3001/upload/portfolio/images", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setShowModal(false);
            setImageFiles([]);
          }
        });
    }
  };

  return (
    <>
      <FormHeading>PORTFOLIO</FormHeading>
      <CardContainer>
        <div className="admin-portfolio-upload-button__container">
          <div>Upload Photos</div>
          <div
            onClick={onClickShowPhotoUploadModal}
            className="portfolio-photos-upload__button"
          >
            <UploadSVG />
          </div>
        </div>
      </CardContainer>
      <Modal
        show={showModal}
        onClose={onCloseModalHandler}
        onBackdropClick={onCloseModalHandler}
        heading="UPLOAD PORTFOLIO PHOTOS"
      >
        <div className="admin-portfolio-select-images__container">
          <label className="admin-portfolio-select-images__lable">
            Select Images
            <input
              onChange={onChangeImageFilesHandler}
              type="file"
              multiple="multiple"
              accept="image/jpeg, image/png, image/jpg"
            />
          </label>
        </div>
        {imageFiles.length > 0 ? (
          <>
            <CardContainer>
              <div className="admin-portfolio-queued-images__container">
                {imageFiles.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="admin-portfolio-queued-image__container"
                    >
                      <img src={URL.createObjectURL(image)} />
                      <div
                        onClick={(event) =>
                          onClickRemoveQueuedImageHandler(event, index)
                        }
                        className="admin-portfolio-queued-image-cancel__button"
                      >
                        ✖
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContainer>
            <br />
            <div
              onClick={onClickUploadPortfolioImagesHandler}
              className="portfolio-photos-upload__button"
            >
              <UploadSVG />
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default AdminPortfolio;
