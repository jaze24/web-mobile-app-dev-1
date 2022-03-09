import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonViewWillEnter} from "@ionic/react";
import { useState } from "react"; 
import PostListItem from "../components/PostListItems";

    export default function PostPages () {
        const [posts, setPosts] = useState([]);
        
        async  function loadPosts() {
            const url = 'https://posts-ionic-default-rtdb.firebaseio.com/posts.json';
            const res = await fetch(url);
            const data = await res.json();
            const postsArray = Object.keys(data).map(key => ({id: key, ...data[key] }));
            setPosts(postsArray.reverse());
        }

        async  function refresh(e) {
            await loadPosts();
            setTimeout(() => {
                e.detail.complete();
            }, 1000);
        }

        useIonViewWillEnter(() => {
            loadPosts();
        });
    
    return (
        <IonPage className="post-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Posts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Posts</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {posts.map(post => (
                        <PostListItem post={post} key={post.id}/>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
