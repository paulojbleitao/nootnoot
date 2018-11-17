import { AsyncStorage } from 'react-native';

export const storeData = async (data: number) => {
    try {
        await AsyncStorage.setItem('count', data.toString());
    } catch (error) {
        // welp.
        console.log(error);
    }
};

export const retrieveData = async () => {
    try {
        const value: string = await AsyncStorage.getItem('count');
        if (value !== null) {
            return parseInt(value);
        } else {
            return 0;
        }
    } catch (error) {
        // oops.
        console.log(error);
    }
};
