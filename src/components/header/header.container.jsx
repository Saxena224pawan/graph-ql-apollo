import React  from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Header from './header.component';
import Spinner from "../spinner/spinner.component";

const GET_CART_HIDDEN = gql`
{
    cartHidden @client
}
`;
const HeaderContainer =({match}) =>(
    <Query query={GET_CART_HIDDEN} 
        >
    {
        ({loading, data:{cartHidden}  }) =>{
         if (loading)  return <Spinner/>
        return <Header hidden ={cartHidden}/>
    }}
    </Query>
);
export default HeaderContainer;