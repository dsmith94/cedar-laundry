import Player from "./Player";

type RootStackParamList = {
    Home: undefined,
    Play: {players: Player[], keyboard: boolean},
    Title: undefined;
};

export default RootStackParamList;