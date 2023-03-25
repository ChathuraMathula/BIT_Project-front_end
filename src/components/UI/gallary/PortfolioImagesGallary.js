import React, { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import CardContainer from "../containers/CardContainer";
import FormHeading from "../form/FormHeading";
import PhotoModal from "../modal/PhotoModal";
import CardContainerTitle from "../titles/CardContainerTitle";
import "./PortfolioImagesGallary.css";

const PortfolioImagesGallary = (props) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/portfolio/images/names")
      .then((res) => res.json())
      .then((data) => {
        console.log([...devideIntoFourArrays(data)]);
        // setImages([...data]);
        setImages([...devideIntoFourArrays(data)]);
      });

    socket.on("portfolio", (data) => {
      console.log("-------->>>>>>>", data)
      setImages([...devideIntoFourArrays(data)]);
    });
  }, []);

  const devideIntoFourArrays = (array) => {
    // if array length is not divided by 4
    if (array.length % 4 !== 0) {
      const fillPositions = 4 - (array.length % 4); // remaining positions to be filled with null
      for (let j = 0; j < fillPositions; j++) {
        array.push(null);
      }
    }

    const miniArrayLength = array.length / 4; // chunck array length

    let mainArray = [];

    for (let i = 0; i < array.length; i += miniArrayLength) {
      mainArray.push(array.slice(i, i + miniArrayLength));
    }

    return mainArray;
  };

  const onClickImageHandler = (event, imageName) => {
    setShowPhotoModal(true);
    setImage(imageName);
  };

  const onClosePhotoModalHandler = (e) => {
    setShowPhotoModal(false);
  };

  const onDeleteImageHandler = async (event, imageName) => {
    await fetch("http://localhost:3001/remove/portfolio/image", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ imageName: imageName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setShowPhotoModal(false);
        }
      });
  };

  return (
    <>
      <CardContainer>
        <CardContainerTitle>PORTFOLIO</CardContainerTitle>
        <div className="portfolio-gallary__row">
          {images.map((imageArray, index) => {
            return (
              <div key={index} className="portfolio-gallary__column">
                {imageArray.map((imageName, index) => {
                  if (imageName) {
                    return (
                      <img
                        onClick={(event) =>
                          onClickImageHandler(event, imageName)
                        }
                        key={index}
                        src={`http://localhost:3001/portfolio/images/${imageName}`}
                      ></img>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </CardContainer>
      <PhotoModal
        onDelete={(event) => onDeleteImageHandler(event, image)}
        show={showPhotoModal}
        onClose={onClosePhotoModalHandler}
        onBackdropClick={onClosePhotoModalHandler}
        src={`http://localhost:3001/portfolio/images/${image}`}
      ></PhotoModal>
    </>
  );
};

export default PortfolioImagesGallary;
