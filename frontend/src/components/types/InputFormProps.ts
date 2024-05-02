export interface InputFormProps {
    name: string;
    value?: string;
    setSearch?: (value: string) => void;
    label: string;
    required?: boolean;
    type?:string;
    min?: number;
    max?: number;
    onInputChange?: (name: string, value: any) => void;
}
