import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { getPair, allPairs } = props;

  return (
    <div className='containerMAIN'>
      <h1>Explore photo pairs in the community!</h1>
      <div className='containerALL'>
      {allPairs.map((pair, i) => (

        <div className='containerPAIR' onClick={(e) => getPair(pair.pair1, pair.pair2, pair.theme)} key={i}>
          <div className='containerPICS' >
            <span className='pairPIC' style={{ backgroundImage: `url('${ pair.pair1.file_url }')`}}></span>
            <span className='pairPIC' style={{ backgroundImage: `url('${ pair.pair2.file_url }')`}}></span>
          </div>
        </div>
        
      ))}
      </div>
    </div>
  );
}


  // return (
  //   <div>
  //     <h1>Explore photo pairs in the community!</h1>
  //     <div className='containerALL'>
  //     {allPairs.map((pair, i) => (

  //       <div className='containerPAIR' onClick={(e) => getPair(pair.pair1, pair.pair2, pair.theme)} key={i}>
  //         <div className='containerTHEME' >
  //           <img className='themePIC' src={'../../resources/images/' + pair.theme + '.png'} />
  //         </div>
  //         <div className='containerPICS' >
  //           <span className='pairPIC' style={{ backgroundImage: `url('${ pair.pair1.file_url }')`}}></span>
  //           <span className='pairPIC' style={{ backgroundImage: `url('${ pair.pair2.file_url }')`}}></span>
  //         </div>
  //       </div>
        
  //     ))}
  //     </div>
  //   </div>
  // );



