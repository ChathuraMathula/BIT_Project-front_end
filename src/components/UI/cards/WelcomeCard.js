import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotographerContacts from "../../user/photographer/PhotographerContacts";
import PhotographerDescription from "../../user/photographer/PhotographerDescription";
import PhotographerName from "../../user/photographer/PhotographerName";
import PhotographerProfilePicture from "../../user/photographer/PhotographerProfilePicture";
import LightBlueButton from "../buttons/LightBlueButton";
import PurpleButton from "../buttons/PurpleButton";
import YellowButton from "../buttons/YellowButton";
import CardContainer from "../containers/CardContainer";
import FlexCenterColumnContainer from "../containers/FlexCenterColumnContainer";
import FlexRowContainer from "../containers/FlexRowContainer";
import NormalCardContainer from "../containers/NormalCardContainer";
import CardContainerTitle from "../titles/CardContainerTitle";
import "./WelcomeCard.css";

const WelcomeCard = (props) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((users) => users.find((user) => user.role === "photographer"))
      .then((photographer) => {
        setSummary(photographer.summary);
        setFirstName(photographer.firstname);
        setLastName(photographer.lastname);
        setEmail(photographer.email);
        setPhoneNo(photographer.phoneNo);
        setFacebook(photographer.fb_link);
        setInstagram(photographer.insta_link);
      });
  }, [summary, firstname, lastname, email, phoneNo, facebook, instagram]);

  useEffect(() => {
    fetch("http://localhost:3001/photographer/profile/picture")
      .then((res) => res.blob())
      .then((data) => {
        if (data.type === "image/jpeg") {
          setImageUrl(URL.createObjectURL(data));
        }
      });
  }, []);

  const onClickDatesHandler = (event) => {
    navigate("/dates", { replace: true });
  };

  const onClickPackagesHandler = (event) => {
    navigate("/packages", { replace: true });
  };

  const onClickPortfolioHandler = (event) => {
    navigate("/portfolio", { replace: true });
  };

  return (
    <>
      <FlexRowContainer>
        <FlexCenterColumnContainer>
          <CardContainer>
            <PurpleButton onClick={onClickDatesHandler}>Dates</PurpleButton>
            <YellowButton onClick={onClickPackagesHandler}>
              Packages
            </YellowButton>
            <LightBlueButton onClick={onClickPortfolioHandler}>
              Portfolio
            </LightBlueButton>
          </CardContainer>
        </FlexCenterColumnContainer>

        <NormalCardContainer>
          <CardContainerTitle>Hire Me...!</CardContainerTitle>
          <PhotographerProfilePicture src={imageUrl} />
          <PhotographerName firstname={firstname} lastname={lastname} />
          <PhotographerDescription description={summary} />
          <PhotographerContacts
            phoneNo={phoneNo}
            email={email}
            facebook={facebook}
            instagram={instagram}
          />
        </NormalCardContainer>
      </FlexRowContainer>
    </>
  );
};

export default WelcomeCard;
