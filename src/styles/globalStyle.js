import {createGlobalStyle} from 'styled-components';
import img from './../components/images/background.jpg';


const GlobalStyle = createGlobalStyle`
  table{
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1.rem;
  width: 600px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); 
}
  
  thead tr{
  background-color: #C9082A;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  }

  td {
      padding: 12px 15px;
  }
  tbody tr{
    border-bottom: 1.75px solid #C9082A;
    background-color: #d3d3d3;
    font-size: 1.2rem;
  }
  tbody tr:nth-of-type(even) {
      background-color: white;
  }
  body {
    background-color: #F2F2F2;
    background-image: url(${img});
    background-size: cover;
  }
  
  `;
  
export default GlobalStyle