//TODO make the room interface
//TODO make the player interface
interface User_Choice{
    label: string;
    action: () => void;
}
interface Room {
    id: string;
    name: string;
    description: string;
    getChoices: () => User_Choice[];
}