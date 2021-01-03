import styled from "styled-components"
import homeBackground from './../components/images/background-home.jpg'
import biggerBackground from './../components/images/background-team.jpg'



export const HomeBackground = styled.body`

@media screen and (min-height: 550px) {
   width: 100vw;
   height: 580px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 580px) {
   width: 100vw;
   height: 610px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 610px) {
   width: 100vw;
   height: 640px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 640px) {
   width: 100vw;
   height: 670px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 670px) {
   width: 100vw;
   height: 700px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 700px) {
   width: 100vw;
   height: 730px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 730px) {
   width: 100vw;
   height: 760px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 760px) {
   width: 100vw;
   height: 790px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}

@media screen and (min-height: 790px) {
   width: 100vw;
   height: 830px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${homeBackground});
   background-size: fit;
}


@media screen and (min-width: 630px) and (min-height: 630px) {
   width: 100vw;
   height: 650px;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${biggerBackground});
   background-size: fit;
}

@media screen and (min-width: 1000px) {
   width: 100vw;
   height: 100vh;
   margin: 0;
   background-color: #F2F2F2;
   background-image: url(${biggerBackground});
   background-size: cover;
}




`