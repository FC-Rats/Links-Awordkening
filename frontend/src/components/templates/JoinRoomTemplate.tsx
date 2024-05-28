import React from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import FormJoinRoom from "../organisms/FormJoinRoom";
import { CenteredLogo } from "../atoms/CenteredLogo";
import "../../assets/css/JoinRoom.css";
import { ReturnButton } from "../molecules/ReturnButton";

export const JoinRoomTemplate = ({ handleInputChange, handleSubmit, handlePreviousPage, }: {
  handleInputChange: (name: string, value: string | boolean) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handlePreviousPage?: () => void;
}) => {
  return (
    <>
      {handlePreviousPage && <ReturnButton handlePreviousPage={handlePreviousPage} />}
      <CenteredLogo></CenteredLogo>
      <div className="JoinTitle">
        <CenteredTitle text="Rejoindre une partie" />
      </div>
      <FormJoinRoom
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
