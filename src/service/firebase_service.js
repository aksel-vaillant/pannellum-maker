import { getFBDatabase, getFBStorage, getFBAuth } from "./firebase_setup"
import { getDocs, collection, doc, getDoc, setDoc, deleteDoc, query, where, limit } from "firebase/firestore"; 
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";

// Paths

const collection_pannellum = "pannellum";
const collection_favorite = "favorite";
const collection_media = "media/";

// Singleton

let user = false;

/*               PANNELLUM               */

export const fetchJSON = async urlConfigFile => {
    let response = await fetch(urlConfigFile);
    let jsonObject = await response.json();
    return jsonObject;
}

export const getAllPannellum = async () => {
    const collection_ref = collection(getFBDatabase(), collection_pannellum);
    const q = query(collection_ref);
    const res = await getDocs(q);

    let data = [];
    let promises = res.docs.map(async pan => {
        let json = await fetchJSON(pan.data().panConfig);

        data.push({
            idPan: pan.id,
            ...pan.data(),            
            panConfig : json, 
        });
    })
    
    // Once we are done calculating everything, we can return the value
    await Promise.all(promises);

    return data;
}

export const getPannellumById = async idPan => {
    const doc_ref = doc(getFBDatabase(), collection_pannellum, idPan);
    const q = query(doc_ref);
    const res = await getDoc(q);
    const json = await fetchJSON(res.data().panConfig);

    let data = {
        idPan : res.id,
        ...res.data(),        
        panConfig : json,
    };

    return data;
}

export const getPannellumByLimit = async nbLimit => {
    const doc_ref = doc(getFBDatabase(), collection_pannellum);
    const q = query(doc_ref, limit(nbLimit));
    const res = await getDocs(q);

    let data = [];
    let promises = res.docs.map( async pan => {
        let json = await fetchJSON(pan.data().panConfig);

        data.push({
            idPan: pan.id,
            ...pan.data(),            
            panConfig : json, 
        });
    })
    
    // Once we are done calculating everything, we can return the value
    await Promise.all(promises);

    return data;
}

export const setPannellum = async (configFile, mediaFile) => {
    if(!user) return;

    const collection_ref = collection(getFBDatabase(), collection_pannellum);
    const doc_ref = doc(collection_ref);
    const doc_id = doc_ref.id;

    await setFiles(doc_id, configFile, mediaFile);
    
    const d = await getFilesByName(doc_id + "/data.json");
    const f = await getFilesByName(doc_id + "/" + mediaFile.name);

    const data = {
        createdAt : Date.now(),
        isPanImage : true,
        lastEditAt : Date.now(),
        panAuthor : user.uid,
        panConfig : d,
        panSource : f,
        views : 0
    }

    await setDoc(doc_ref, data);

    console.log("New document has been added " + doc_id);
}

export const deletePannellum = async idPan => {
    const doc_ref = doc(getFBDatabase(), collection_pannellum, idPan);

    await deleteDoc(doc_ref);

    await deleteAllFavorite(idPan);

    await deleteFiles(idPan);
}

/*               FAVORITE PANNELLUM               */

export const getFavorite = async () => {
    let data = [];

    if(!user) return data;

    const collection_ref = collection(getFBDatabase(), collection_favorite);
    const q = query(collection_ref, where("idUser", "==", user.uid));
    const res = await getDocs(q);

    res.forEach(pan => {
        data.push({
            idPan: pan.id, 
            ...pan.data()
        })
    })

    return data;
}

export const setFavorite = async idPan => {
    if(!user) return false;

    const collection_ref = doc(getFBDatabase(), collection_favorite);
    const data = {
        idPan : idPan,
        idUser : user.uid
    }
    
    await setDoc(collection_ref, data);

    return true;
}

export const deleteFavorite = async idPan => {
    if(!user) return false;

    const collection_ref = collection(getFBDatabase(), collection_favorite);
    const q = query(collection_ref, where("idUser", "==", user.uid), where("idPan", "==", idPan));
    const res = await getDocs(q);
    
    if(res.length === 0){
        await deleteDoc(res[0]);
        return true;
    }

    return false;
}

export const deleteAllFavorite = async idPan => {
    const collection_ref = collection(getFBDatabase(), collection_favorite);
    const q = query(collection_ref, where("idPan", "==", idPan));
    const res = await getDocs(q);

    res.forEach(doc => {
        deleteDoc(doc);
    });
}

/*               MEDIA FILES               */

export const getFilesById = async idPan => {
    const list_ref = ref(getFBStorage(), collection_media + idPan);
    const res = await listAll(list_ref);
    const urlPromises = res.items.map((imageRef) => getDownloadURL(imageRef));
    const result = Promise.all(urlPromises);
    return result;
}

export const getFilesByName = async nameFile => {
    const list_ref = ref(getFBStorage(), collection_media + nameFile);
    const url_file = await getDownloadURL(list_ref);
    return url_file;
}

export const setFiles = async (idDoc, configFile, mediaFile) => {
    let storage_ref = ref(getFBStorage(), collection_media + idDoc + "/data.json");
    let metadata = {contentType: 'application/json'};
    await uploadBytes(storage_ref, configFile, metadata);

    storage_ref = ref(getFBStorage(), collection_media + idDoc + "/" + mediaFile.name);
    metadata = {contentType: mediaFile.type};
    await uploadBytes(storage_ref, mediaFile, metadata);
}

export const deleteFiles = async idPan => {
    const list_ref = ref(getFBStorage(), collection_media + idPan);
    await deleteObject(list_ref);
}

/*               USER AUTHENTIFICATION               */

export const getCurrentUser = () => {

    if(window.localStorage.getItem("user")){
        user = JSON.parse(window.localStorage.getItem("user"))
    }

    return user;
}

export const createUserByPassword = async (email, password) => {    
    
    await createUserWithEmailAndPassword(getFBAuth(), email, password)
    .then((userCredential) => {
        user = userCredential.user;
    })
    .catch((error) => {
        console.log("Error createUserByPassword " + error);
    });

    return user;
}

export const signInUserByGoogle = async () => {

    const provider = new GoogleAuthProvider();

    await signInWithPopup(getFBAuth(), provider)
    .then((userCredential) => {
        user = userCredential.user;    
        window.localStorage.setItem("user", JSON.stringify(user));
    }).catch((error) => {
        user = false;
        console.log("Error signInUserByGoogle " + error);
    });

    return user;
}

export const signInUserByPassword = async (email, password) => {

    await signInWithEmailAndPassword(getFBAuth(), email, password)
    .then((userCredential) => {
        user = userCredential.user;
    })
    .catch((error) => {
        console.log("Error getSignInPassword " + error);
    });

    return user;
}

export const signOutUser = async () => {
    window.localStorage.removeItem("user");
    
    await signOut(getFBAuth()).then(() => {
        user = false;
    }).catch((error) => {
        console.log("Error signOutUser " + error);
    });
}