export interface ModifyUserRadioGroupProps {
    title: string;
    name: string;
    value: boolean;
    onInputChange?: (name: string, value: any) => void;
}
