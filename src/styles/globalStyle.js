import {createGlobalStyle} from 'styled-components';
import img from './../components/images/background5.jpg';


const GlobalStyle = createGlobalStyle`
  table{
  border-collapse: collapse;
  font-size: 1.rem;
  width: 700px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); 
  opacity: 0.95;
}
  
  thead tr{
  background-color: #17408B;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  }

  td {
      padding: 12px 15px;
  }
  tbody tr{
    border-bottom: 1.75px solid #17408B;
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