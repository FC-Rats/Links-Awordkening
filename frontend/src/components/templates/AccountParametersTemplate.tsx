import React, { useState } from 'react';
import AccountEditMode from '../organisms/AccountEditMode';
import { UserInfo } from '../types/UserInfo';
import { AccountViewMode } from '../organisms/AccountViewMode';
import "../../assets/css/AccountParameters.css"

export const AccountParametersTemplate = ({ data }: { data: UserInfo }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserInfo>(data);
  const [selectedImage, setSelectedImage] = useState<string>(formData.profilPicture);

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div>
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
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};
