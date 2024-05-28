import Stack from "@mui/material/Stack";
import { InputForm } from "../molecules/InputForm";
import "../../assets/css/AcceptRefuseFriendRequest.css";
import { SubmitButton } from "../molecules/SubmitButton";

export default function FormJoinRoom({
  handleInputChange,
  handleSubmit,
}: {
  handleInputChange: (name: string, value: string | boolean) => void;
  handleSubmit: (event: React.FormEvent) => void;
}) {

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        className="form-join"
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <InputForm
          name="codeRoom"
          label="Joindre la partie"
          onInputChange={handleInputChange}
        />
        <div className="btn-join">
          <SubmitButton text="Valider" />
        </div>
      </Stack>
    </form>
  );
}
