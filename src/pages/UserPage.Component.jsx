import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getUser } from '../services/auth.service';

const UserPageComponent = () => {
    const params = useParams()

    useEffect(() => {
      getUser(params.id).then((res) => {
        //console.log(res.data);
      });
    }, [params.id]);    

  return (
    <div>UserPageComponent</div>
  )
}

export default UserPageComponent