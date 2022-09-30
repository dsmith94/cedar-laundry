import Player from "./Player";

type RootStackParamList = {
    Home: undefined,
    Play: {players: Player[]},
    Profile: { userId: string };
};

export default RootStackParamList;