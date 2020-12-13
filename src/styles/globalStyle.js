import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  table{
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1.rem;
  width: 500px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); 
}
  thead tr{
  background-color: #C9082A;
  color: white;
  font-weight: bold;
  }
  td {
      padding: 12px 15px;
  }

  tbody tr{
    border-bottom: 1.75px solid #C9082A;

  }
  tbody tr:nth-of-type(even) {
      background-color: white;
  }
  
  `;
  
export default GlobalStyle