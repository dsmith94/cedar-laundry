import React, { useState, useEffect } from 'react';

import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RootStackParamList from './RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import NameSlot from './NameSlot';
import Player from './Player';
import LayupCard from './LayupCard';
import PreviewCard from './PreviewCard';
import Scriptures from './Scriptures';
import Flashcard from './Flashcard';
import VerseCard from './VerseCard';
import YesCard from './YesCard';
import NoCard from './NoCard';
import BonusChanceCard from './BonusChanceCard';
import ScoreCard from './ScoreCard';


const image = { uri: require('../assets/bg.jpg') };

type phaseType = 'layup' | 'preview' | 'bonus' | 'verse' | 'yes' | 'no' | 'show score';


function shuffleArray(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}


const buildCardSet = () => 
    Scriptures.split('$').map(c => {
        const f = new Flashcard();
        const both = c.split('%');
        f.back = both[1];
        f.front = both[0];
        return f;
    });


const extractBook = (f: Flashcard) => {
    const arr = f.back.split(' ');
    arr.pop();
    return arr.join(' ');
}


const extractChapter = (f: Flashcard) => {
    const arr = f.back.split(' ');
    const citation = arr.pop();
    const chapter = citation?.split(':')[0];
    return chapter ?? '';
}

/*
const extractVerse = (f: Flashcard) => {
    const arr = f.back.split(' ');
    const citation = arr.pop();
    const verse = citation?.split(':')[1];
    return verse ?? '';
}
*/


const timeToWait = 3000;
const timeToNextTurn = 5000;


type Props = StackScreenProps<RootStackParamList, 'Play'>;
function PlayPage({ route, navigation }: Props) {

    const [players, setPlayers] = useState(route.params.players);
    const [score, setScore] = useState(new Map<number, number>());
    const [bonusTurn, setBonusTurn] = useState(new Map<number, number>());
    const [index, setIndex] = useState(0);
    const [turn, setTurn] = useState(0);
    const [bonusActive, setBonusActive] = useState(false);
    const [phase, setPhase] = useState<phaseType>('layup');
    const [scriptures, setScriptures] = useState(buildCardSet());
    const [scoreBuffer, setScoreBuffer] = useState(0);

    useEffect(() => {
        let p = [...players];
        for (let i = 0; i < players.length; i += 1) {
            bonusTurn.set(i, Math.floor(Math.random() * 4) + 1);
        }
        setBonusTurn(new Map(bonusTurn));
        shuffleArray(p);
        setPlayers([...p]);
        shuffleArray(scriptures);
        advanceTurn();
        setIndex(0);
    }, []);

    const advanceTurn = () => {
        let i = index + 1;
        if (i > (players.length - 1)) {
            i = 0;
            setTurn(turn + 1);
        }
        scriptures.splice(0, 1);
        while (!scriptures[0]) {
            scriptures.splice(0, 1);
        }
        setScriptures([...scriptures]);
        setBonusActive(false);
        if (turn < 5) {
            setPhase('layup');
            setTimeout(() => {
                setPhase('preview');
            }, timeToWait);
            setTimeout(() => {
                if (bonusTurn.get(index) === turn) {
                    setPhase('bonus');
                } else {
                    setPhase('verse');
                }
            }, timeToWait * 2);
            setIndex(i);
        } else {
            setPhase('show score');
        }
    }
  
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.roundedContainer}>
                    {
                        (phase === 'layup') &&
                        <LayupCard player={players[index]} currentTotal={score.get(index) ?? 0} turn={turn} />
                    }
                    {
                        (phase === 'preview') &&
                        <PreviewCard book={extractBook(scriptures[0])} />
                    }
                    {
                        (phase === 'verse') &&
                        <VerseCard verse={scriptures[0].front} finishTurn={(chapter, timeLeft) => {
                            const correctChapter = extractChapter(scriptures[0]);
                            if (correctChapter === chapter) {
                                const s = score.get(index) ?? 0;
                                const pointsAwarded = (bonusActive === true) ? timeLeft * 2 : timeLeft;
                                score.set(index, s + pointsAwarded);
                                setScoreBuffer(pointsAwarded);
                                setScore(new Map(score));
                                setPhase('yes');
                            } else {
                                const s = score.get(index) ?? 0;
                                const newPointsTotal = (bonusActive === true) ? s / 2 : s;
                                score.set(index, Math.floor(newPointsTotal));
                                setPhase('no');
                            }
                            setTimeout(advanceTurn, timeToNextTurn);
                        }} />
                    }
                    {
                        (phase === 'bonus') &&
                        <BonusChanceCard 
                            player={players[index]} 
                            setBonusChance={v => {
                                setBonusActive(v);
                                setPhase('verse');
                            }}
                        />
                    }
                    {
                        (phase === 'show score') &&
                        <ScoreCard 
                            players={players}
                            scores={score}
                            finishCard={() => {
                                navigation.goBack();
                            }}
                        />
                    }
                    {
                        (phase === 'yes') &&
                        <YesCard 
                            player={players[index]}
                            verse={scriptures[0].front}
                            citation={scriptures[0].back}
                            pointsAdded={scoreBuffer}
                            currentTotal={score.get(index) ?? 0}
                        />
                    }
                    {
                        (phase === 'no') &&
                        <NoCard 
                            verse={scriptures[0].front}
                            citation={scriptures[0].back}
                            currentTotal={score.get(index) ?? 0}
                        />
                    }
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundedContainer: {
    width: Dimensions.get('screen').width * 0.7,
    marginVertical: 10,
    paddingBottom: Dimensions.get('screen').height * 0.05,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
  },
  bottomButton: {
    width: 128,
    height: 64,
    borderRadius: 20,
    marginHorizontal: (Dimensions.get('screen').width * 0.35) - 64,
    backgroundColor: 'gray'
  },
  endButtonText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  endButton: {
    width: 64,
    height: 64,
    borderRadius: 10,
    left: (Dimensions.get('screen').width * 0.7) - 64,
    backgroundColor: '#44D7A8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayPage;