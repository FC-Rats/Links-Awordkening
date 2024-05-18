import React from 'react';
import AccountEditMode from '../organisms/AccountEditMode';
import { UserInfo } from '../types/UserInfo';
import { AccountViewMode } from '../organisms/AccountViewMode';
import "../../assets/css/AccountParameters.css"
import { AlertBox } from '../molecules/AlertBox';

interface AccountParametersTemplateProps {
  user: UserInfo;
  editMode: boolean;
  formData: UserInfo;
  selectedImage: string;
  alertBox: {
    severity: string;
    open: boolean;
    message: string;
  };
  handleInputChange: (name: string, value: string | boolean) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleCancel: () => void;
  handleAlert: (event: React.SyntheticEvent | Event, reason?: string) => void;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  handleEdit: () => void;
}

export const AccountParametersTemplate: React.FC<AccountParametersTemplateProps> = ({
  user,
  editMode,
  formData,
  selectedImage,
  alertBox,
  handleInputChange,
  handleSubmit,
  handleCancel,
  handleAlert,
  setSelectedImage,
  handleEdit
}) => {
  return (
    <div>
      <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
      {editMode ? (
        <AccountEditMode
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      ) : (
        <AccountViewMode
          formData={formData}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};
