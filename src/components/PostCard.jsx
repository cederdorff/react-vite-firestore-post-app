import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { usersRef } from "../firebase-config";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(usersRef, auth.currentUser.uid), doc => {
            setUser(doc.data());
        });
        return () => unsubscribe();
    }, [auth.currentUser.uid]);

    /**
     * handleClick is called when user clicks on the Article (PostCard)
     */
    function handleClick() {
        navigate(`/posts/${post.id}`);
    }

    async function handleAddToFav() {
        const currentUserDocRef = doc(usersRef, auth.currentUser.uid); // reference to current authenticated user doc
        await updateDoc(currentUserDocRef, {
            favorites: arrayUnion(post.id) // updating current user's favorites field in firebase by adding post id
        }); // docs about update elements in an array: https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
    }

    async function handleRemoveFromFav() {
        const currentUserDocRef = doc(usersRef, auth.currentUser.uid); // reference to current authenticated user doc
        await updateDoc(currentUserDocRef, {
            favorites: arrayRemove(post.id) // updating current user's favorites field in firebase by removing post id
        }); // docs about update elements in an array: https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
    }

    return (
        <article>
            <div onClick={handleClick}>
                <UserAvatar uid={post.uid} />
                <img src={post.image} alt={post.title} />
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            {user.favorites?.includes(post.id) ? (
                <button className="light" onClick={handleRemoveFromFav}>
                    Remove from favorites
                </button>
            ) : (
                <button onClick={handleAddToFav}>Add to favorites</button>
            )}
        </article>
    );
}
