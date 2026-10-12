export interface User_Choice {
    label: string;
    action: () => void;
}

export interface Room {
    id: string;
    name: string;
    description: string;
    getChoices: () => User_Choice[];
}