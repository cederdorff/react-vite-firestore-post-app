import { useState, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import PostCard from "../components/PostCard";
import { getAuth } from "firebase/auth";
import { postsRef, usersRef } from "../firebase-config";

export default function FavoritesPage({ showLoader }) {
    const [favPosts, setFavPosts] = useState([]);
    const auth = getAuth();

    useEffect(() => {
        async function getUserFavPosts(userFavs) {
            const userFavPosts = [];
            for (const favPostId of userFavs) {
                const favPostRef = doc(postsRef, favPostId);
                const favPost = (await getDoc(favPostRef)).data();
                favPost.id = favPostId;
                userFavPosts.push(favPost);
            }
            setFavPosts(userFavPosts);
        }

        if (auth.currentUser) {
            onSnapshot(doc(usersRef, auth.currentUser.uid), doc => {
                showLoader(true);
                const userData = doc.data();
                if (userData && userData.favorites) {
                    getUserFavPosts(userData.favorites);
                }
                showLoader(false);
            });
        }
    }, [auth.currentUser, showLoader]);

    return (
        <section className="page">
            <section className="grid-container">
                {favPosts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
            </section>
        </section>
    );
}
