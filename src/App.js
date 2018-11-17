/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Sound from 'react-native-sound';
import { storeData, retrieveData } from './storage';

const pingu = require('../assets/images/pingu.png');
const noot = require('../assets/images/noot.png');

Sound.setCategory('Playback');
const nootNoot = new Sound('noot.mp3', Sound.MAIN_BUNDLE);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23245F'
    },
    pingu: {
        maxWidth: '80%',
        maxHeight: '60%'
    },
    counter: {
        color: 'gray',
        fontSize: 20,
        marginTop: 20
    }
});

type Props = {};

type State = {
    count: number,
    isNooting: boolean
};

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { count: 0, isNooting: false };

        this.handlePress = this.handlePress.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }

    componentDidMount() {
        retrieveData().then(data => {
            this.setState({ ...this.state, count: data });
        });
    }

    handlePress() {
        const { count } = this.state;
        nootNoot.play(this.handlePlay);
        this.setState({ ...this.state, isNooting: true });
    }

    handlePlay(success) {
        if (success) {
            const { count } = this.state;
            storeData(count + 1).then(() => {
                this.setState({ count: count + 1, isNooting: false });
            });
        } else {
            nootNoot.reset();
        }
    }

    render() {
        const { count, isNooting } = this.state;
        const source = isNooting ? noot : pingu;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <Image style={styles.pingu} source={source} />
                </TouchableWithoutFeedback>
                <Text style={styles.counter}>Noot noot count: {count}</Text>
            </View>
        );
    }
}
