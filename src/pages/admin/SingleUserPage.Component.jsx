import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/user.service";
import { useEffect } from "react";

const SingleUserPageComponent = () => {
    const {id} = useParams();
    const getSingleUserById = useQuery(['getUserById'], ()=> getUserById(id), {enabled: !!id});

    //TODO: layout user info
    useEffect(() => {
        console.log(getSingleUserById);
    }, [getSingleUserById])

  return (
    <h1>User</h1>
  )
}

export default SingleUserPageComponent