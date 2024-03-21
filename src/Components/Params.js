// import React from 'react'
// import { Outlet, useSearchParams } from 'react-router-dom';
// function Params() {
//   const [searchParams, setSearchParams]= useSearchParams();
//   // const showActiveUser= searchParams.get('Filter');
//   return (
//     <div>
      
//       <h2>User1</h2>
//       <h2>User2</h2>
//       <h2>User3</h2>
//       <Outlet/>

//       <button onClick={()=> setSearchParams({Filter:'active'})}>Active User</button>
//       <button onClick={()=> setSearchParams({})}>Reset-Params</button>
     
//     </div>
//   )
// }

// export default Params;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
export default function Params() {
    const [APIData, setAPIData] = useState([])
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
            />
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {APIData.map((item) => {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Description>
                                    {item.email}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </div>
    )
}