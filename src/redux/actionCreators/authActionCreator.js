import * as types from "../actionsTypes/authActionTypes";
import fire from "../../config/firebase";

const loginUser = (payload) => {
    return {
        type: types.SIGN_IN,
        payload,
    };
};

const logOutUser = () => {
    return {
        type: types.SIGN_OUT,
    };
};

// Action creators
export const signInUser = (email, password, setSuccess) => (dispatch) => {
    fire.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(
                loginUser({
                    uid: user.user.uid,
                    email: user.user.email,
                    displayName: user.user.displayName,
                })
            );
            if (typeof setSuccess === "function") setSuccess(true); // Safeguard
        })
        .catch((error) => {
            alert("Invalid email or password");
            console.error(error);
            if (typeof setSuccess === "function") setSuccess(false); // Safeguard
        });
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
    fire.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            user.updateProfile({ displayName: name })
                .then(() => {
                    dispatch(
                        loginUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                        })
                    );
                    if (typeof setSuccess === "function") setSuccess(true); // Safeguard
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                    if (typeof setSuccess === "function") setSuccess(false); // Safeguard
                });
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("The email address is already in use by another account.");
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email address.");
            } else if (error.code === "auth/weak-password") {
                alert("Password is too weak.");
            } else {
                alert("Error signing up. Please try again.");
            }
            console.error(error);
            if (typeof setSuccess === "function") setSuccess(false); // Safeguard
        });
};

export const signOut = () => (dispatch) => {
    dispatch(logOutUser());
};
export const checkIsLoggedIn = () => dispatch => {
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(
                loginUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            );
        } 
    })
}
