import React, {useState, useEffect} from "react";
import Amadeus from 'amadeus';
import SearchList from '../components/SearchList';
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
    clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
  });



const Home = () =>{

    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        amadeus.shopping.flightOffersSearch.get({
            originLocationCode: 'SYD',
            destinationLocationCode: 'BKK',
            departureDate: '2021-08-01',
            
            adults: '1',
            children: '2',
            travelClass: 'BUSINESS',
            nonStop: false,
            currencyCode: 'USD'
        })
        .then(({data}) => {
            // console.log(data);
            // clean up duplicate price options, as the API has sorted the cheapest with shortest travel time option first
            // duplicate option is redundant
            const cleanedData = data.filter((option, index)=>(
                index === 0 || ((index>0) && ((option.price.grandTotal!==data[index-1].price.grandTotal)||(option.validatingAirlineCodes[0]!==data[index-1].validatingAirlineCodes[0])))
            ));

            setSearchResult(cleanedData);
            
        }).catch((responseError) => {
            console.log(responseError);
        });
    },[])

    return (
        <SearchList searchResult={searchResult} amadeus={amadeus}/>
    )
}

export default Home;