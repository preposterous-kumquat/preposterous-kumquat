import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { sampleData, getPair, allPairs } = props;

  // let photoElements = userPhotos.length === 0
  //   ? <p>You have not uploaded any photos yet.</p>
  //   : <div className='homeContainer'>
  //     {userPhotos.map(({file_url, id, Theme}, i) => (
  //       <span className='picContainer' onClick={(e) => {
  //         console.log('id:', id, 'theme:', Theme.theme);
  //         getStack(id, Theme.theme);
  //       }} style={{ backgroundImage: `url('${ file_url }')`}} key={i}></span>
  //     ))}
  //     </div>;

  return (
    <div>
      <h1>Explore photo pairs in the community!</h1>
      <div className='containerALL'>
      {allPairs.map((pair, i) => (

        <div className='containerPAIR' onClick={(e) => getPair(pair.pair1, pair.pair2, pair.theme)} key={i}>
          <div className='containerTHEME' >
            <img className='themePIC' src={'../../resources/images/' + pair.theme + '.png'} />
          </div>
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

// <span className='containerPIC' >
//               <img className='pairPIC' src={pair.pair1.file_url} />
//             </span>
//             <span className='containerPIC' >
//               <img className='pairPIC' src={pair.pair2.file_url} />
//             </span>
