import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

export default function protected_visitor({children}) {

    const { id } = useParams();
    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    const region1 = user.data.region1;
    const region2 = user.data.region2;


    const location = useLocation();
    const pathSegments = location.pathname.split('/');

    const [place, setplace] = useState();
    const [post, setpost] = useState();

    const fetchPlace = async () => {
          try {
            const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${parseInt(id)}/`);
            setplace(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    const fetchPost = async () => {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/post/${parseInt(id)}/`);
          setpost(response.data.data);
          console.log(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          await fetchPlace();
          await fetchPost();
        };
        fetchData();
    }, []);

    

    if(pathSegments[1] == 'feed-info'){
        if(region1 != post.post_region) {
            return <Navigate to ={`/visitor-feed-info/${id}`}/>;
        }
    }
    else if(pathSegments[1] == 'place-info'){
        console.log(place);

        if(region1 != place.address.split(' ').slice(1,4).join(' ')) {
            return <Navigate to ={`/visitor-place-info/${id}`}/>;
        }
    }
    return children;

}