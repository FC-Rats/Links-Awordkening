export interface InputFormProps {
    name: string;
    value?: string;
    label: string;
    required?: boolean;
    type?:string;
    min?: number;
    max?: number;
    defaultvalue? :string;
    onInputChange?: (name: string, value: any) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}
