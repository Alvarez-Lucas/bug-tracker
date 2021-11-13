import {auth, googleAuthProvider} from '../lib/firebase.js';

export default function Enter(props) {
    const user = null;
    const username = null;



    return (
        <main> 
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
        
            }
        </main>
    );
}


function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            sign in with google
        </button>
    );
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>
        Sign out
    </button>;
}

function UsernameForm() {
    return null;
}
