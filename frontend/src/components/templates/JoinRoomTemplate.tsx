import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { SignInForm } from "../organisms/SignInForm";
import FormJoinRoom from "../organisms/FormJoinRoom";
import { CenteredLogo } from "../atoms/CenteredLogo";
import "../../assets/css/JoinRoom.css";

export const JoinRoomTemplate = ({
  handleInputChange,
  handleSubmit,
}: {
  handleInputChange: (name: string, value: string | boolean) => void;
  handleSubmit: (event: React.FormEvent) => void;
}) => {
  return (
    <>
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
