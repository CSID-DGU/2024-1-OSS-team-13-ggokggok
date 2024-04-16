import { styled } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const ContentImg = styled.img`
height: 50px;
width: 50px;
border-radius: 10px;
margin: 0 10px 0 0;
`;

export default function Feed(id, subject, content, date, author){


    return(
        <div style={{display: 'flex'}}>
            <ContentImg src="/"></ContentImg>
            <div>
                <h3>{subject}</h3>
                <p>{content}</p>
            </div>
        </div>
    );
}
