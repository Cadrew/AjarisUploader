import { AsyncStorage } from 'react-native';

ajarisProfiles = [];

export function _storeProfiles(profiles) {
    try {
        return AsyncStorage.setItem('@AjarisUploader:profiles', JSON.stringify(profiles));
    } catch (error) {
        console.error(error);
    }
};

export function _retrieveProfiles() {
    try {
        return AsyncStorage.getItem('@AjarisUploader:profiles', (err, result) => {     
            let profiles = result;       
            if (profiles !== null) {
                ajarisProfiles = JSON.parse(profiles);
            } else {
                ajarisProfiles = [];
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export function _addProfile(profile) {
    try {
        return AsyncStorage.getItem('@AjarisUploader:profiles', (err, result) => {
            let profiles = [];
            if (result !== null) {
                profiles = (JSON.parse(result));
            }
            profiles.push(profile);
            _storeProfiles(profiles);
        });
    } catch (error) {
        console.error(error);
    }  
}

export function _removeProfile(profile) {
    try {
        return AsyncStorage.getItem('@AjarisUploader:profiles', (err, result) => {
            if (result == null) result = '[]';
            let profiles = result;            
            let index = profiles.indexOf(profile);
            if (index > -1) {
                profiles.splice(index, 1);
            }
            if (profiles.length > 0) {
                this._storeProfiles(profiles);
            } else {
                AsyncStorage.removeItem('@AjarisUploader:profiles');
            }
        });
    } catch (error) {
        console.error(error);
    }  
}

export function _removeAllProfiles() {
    try {
        return AsyncStorage.removeItem('@AjarisUploader:profiles');
    } catch (error) {
        console.error(error);
    }  
}

export function getProfiles() {
    return ajarisProfiles;
}