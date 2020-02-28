export function getUrl(url) {
    return fetch(url + '/upCheck.do')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
}

export function postLogIn(url, pseudo, password) {
    return fetch(url + '/upLogin.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo: pseudo,
                password: password,
            }),
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
}

export function postProfile(url, jsessionid, ptoken, config) {
    return fetch(url + '/upSetConfigImport.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsessionid: jsessionid,
                ptoken: ptoken,
                config: config,
            }),
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
}

export function postSend(url, jsessionid, ptoken, fileToUpload, contributionComment, base, contribution = true) {
    return fetch(url + '/upImportDoc.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsessionid: jsessionid,
                ptoken: ptoken,
                Filetoupload: fileToUpload,
                ContributionComment: contributionComment,
                Document_numbasedoc: base,
                contribution: contribution,
            }),
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
}

export function postLogOut(url, jsessionid) {
    return fetch(url + '/upLogout.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsessionid: jsessionid,
            }),
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
}