import AsyncStorage from '@react-native-async-storage/async-storage';

function handleException(e: unknown) {
    if (e instanceof Error) {
        console.error('Error in AsyncStorage:', e.message);
    } else {   
        console.error('Unknown error in AsyncStorage:', e);
    }

    return null;
}

async function getAsNumber(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? Number(value) : null;
    }  catch (e) {
        return handleException(e);
    }
}

async function getAsString(key: string) {
    try {
        return await AsyncStorage.getItem(key);
    }  catch (e) {
        return handleException(e);
    }
}

async function getAsObject<T>(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) as T : null;
    } catch (e) {
        return handleException(e);
    }
}

async function getAsArray<T>(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) as T[] : null;
    } catch (e) {
        return handleException(e);
    }
}

async function getAsBoolean(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? Boolean(value) : null;
    } catch (e) {
        return handleException(e);
    }
}

async function setAsValue(key: string, value: unknown) {
    try {
        if (!value) {
            return await AsyncStorage.removeItem(key);
        }

        if (typeof value === 'object' || Array.isArray(value)) {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        }

        return await AsyncStorage.setItem(key, value.toString());
    } catch (e) {
        return handleException(e);
    }
}

export {
    getAsNumber,
    getAsString,
    getAsObject,
    getAsArray,
    getAsBoolean,
    setAsValue,
}