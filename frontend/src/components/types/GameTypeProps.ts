export interface GameTypeProps {
    type: 'solo' | 'multi';
    isSelected: boolean;
    onClick: () => void;
}