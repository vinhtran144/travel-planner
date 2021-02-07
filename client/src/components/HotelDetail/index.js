import React, {useState} from 'react';
import {Accordion, Icon, Button,Popup} from 'semantic-ui-react';

const HotelDetail = ({hotelResult, activeIndex, setActiveIndex, id})=>{
    const {hotel:{name,rating,contact, hotelDistance},offers} =hotelResult;
    const {price:{total,currency}} = offers[0];

    // Temporary popup
    const [open, setOpen] = useState(false)

    const handleClick = (e,{index}) =>{
        const newIndex = (activeIndex === index)? -1 : index;
        setActiveIndex(newIndex);
    }

    return (
        <>
            <Accordion.Title active = {activeIndex === id} index={id} onClick={handleClick}>
                <Icon name='dropdown' />
                {/* Header information */}
                    {name}{' '} {total}{' '}{currency}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                {/* Departure and returning */}
                <p>{hotelDistance.distance}km away from airport</p>
                <p>Rating: {rating} star</p>
                <p>Phone: {contact.phone}</p>
                <p>Fax: {contact.fax}</p>
                <Popup
                    content='Will be added later'
                    on='click'
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    position='top left'
                    trigger={<Button content={'Save'}/>}
                />
            </Accordion.Content>
        </>
    );

}


export default HotelDetail;