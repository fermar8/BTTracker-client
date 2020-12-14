import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router'


//Try to make a single button for every EditStats form

class AllPlayerStats extends Component {
  constructor(props){
      super(props);
        this.state = {
            data: []
        }
   }

componentDidMount() {
    axios.get(`http://localhost:4000/api/team/stats`, {withCredentials: true})
        .then( (response ) => {
            this.setState({data: [...response.data]});
        })
        .catch((err) => console.log(err))
}

render() {

    let data = this.state.data

    let filterPlayerPerf = data.reduce(function(acc, val){
        let p = acc.filter(function(perfObj){
            return perfObj.name===val.player.name;
        }).pop() || {name:val.player.name, 
                    ftAttempted: 0, ftConverted:0, twoPAttempted:0,
                    twoPConverted:0, threePAttempted:0, threePConverted:0};
        
         
        p.ftAttempted += val.ftAttempted;
        p.ftConverted += val.ftConverted;
        p.twoPAttempted += val.twoPAttempted;
        p.twoPConverted += val.twoPConverted;
        p.threePAttempted += val.threePAttempted;
        p.threePConverted += val.threePConverted;
        
        acc.push(p);
        return acc;
    },[]);

    const filterFinal =  filterPlayerPerf.filter((v, i, a) => a.findIndex(p=>(p.name === v.name && p.name===v.name))===i);

 console.log(filterFinal)
    return(
        <main className="main">

       <div>
         
       </div>

           <div>
               
       <table>
        <thead>
         <tr>
             <th>Player</th>
             <th>FT</th>
             <th>FTA</th>
             <th>FT%</th>
             <th>2P</th>
             <th>2PA</th>
             <th>2P%</th>
             <th>3P</th>
             <th>3PA</th>
             <th>3P%</th>
         </tr>
        </thead>
        <tbody>
        {filterFinal.map((performance) => {
     return (
       
         <tr key={performance.name}>
             <td style={{fontWeight: "bold"}}>{performance.name}</td>
             <td>{performance.ftConverted}</td>
             <td>{performance.ftAttempted}</td>
             <td>{((performance.ftConverted/performance.ftAttempted)*100).toPrecision(3) + '%'}</td>
             <td>{performance.twoPConverted}</td>
             <td>{performance.twoPAttempted}</td>
             <td>{((performance.twoPConverted/performance.twoPAttempted)*100).toPrecision(3) + '%'}</td>
             <td>{performance.threePConverted}</td>
             <td>{performance.threePAttempted}</td>
             <td>{((performance.threePConverted/performance.threePAttempted)*100).toPrecision(3) + '%'}</td>
             
         </tr>    
           
           )
      })}
            </tbody>
        </table>

       </div>
    </main>
       )
 }

}


export default withRouter(AllPlayerStats);