import { useEffect, useState } from "react";

function Get2(){
    const [loading, setloading] = useState(true);
    const [feed, setfeed] = useState([]);

    const getfeed = async () => {
        const json = await (
        await fetch(
            `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
        )
        ).json();
        setfeed(json.data.movies);
        setloading(false);
    };

    useEffect(() => {
    /*  fetch( "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")
        .then(res => res.json())
        .then(json => {
        setmovie(json.data.movies);
        setloading(false); 
        }); */
        getfeed();
    },[]);


    return (
        <div>
        {loading ? <h1>Loading</h1> : (
            <div>
            <h1>Title: {feed.length} </h1>
            {feeds.map(m => (
                <h1>{feed.title}</h1>
            ))}
            </div>
        )}
        </div>
    );
}

export default Get2;