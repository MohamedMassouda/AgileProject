import React from 'react';
import EventDescription from './Event';
import './EventDescription.css';

export default function Events() {
    const Events = [
        {
            id: 1,
            title: 'The Great Gatsby',
            imageUrl: 'https://via.placeholder.com/150',
            dateTime: "April 10, 192",
            locationMap: 'https://example.com/location1',
            description: 'This is event 1 description.'
        },
        {
            id: 2,
            title: 'Smart Contract with us',
            imageUrl: 'https://via.placeholder.com/150',
            dateTime: '2024-05-02 02:00 PM',
            locationMap: 'https://example.com/location2',
            description: 'This is event 2 description.'
        },
        {
            id: 3,
            title: 'IE Experience Day Tunisia',
            imageUrl: 'https://pointemagazine.com/wp-content/uploads/2022/04/Demitra-Bereveskos-in-Serenade.-Choreography-by-George-Balanchine.-%C2%A9-The-Balanchine-Trust.-Photo-by-Rosalie-OConnor.-4-CROP_Web_R1crop2.jpg',
            dateTime: '2024-05-03 07:00 PM',
            locationMap: 'https://example.com/ballet-location',
            description: 'The ballet performance description.'
        },
        {
            id: 4,
            title: 'Holi Festival',
            imageUrl: 'https://via.placeholder.com/150',
            dateTime: '2024-05-01 10:00 AM',
            locationMap: 'https://example.com/location1',
            description: 'This is event 1 description.'
        },
        {
            id: 5,
            title: 'Lantern Festival',
            imageUrl: 'https://via.placeholder.com/150',
            dateTime: '2024-05-01 10:00 AM',
            locationMap: 'https://example.com/location1',
            description: 'This is event 1 description.'
        },
        {
            id: 6,
            title: 'Mardi Gras',
            imageUrl: 'https://via.placeholder.com/150',
            dateTime: '2024-05-01 10:00 AM',
            locationMap: 'https://example.com/location1',
            description: 'This is event 1 description.'
        },
    ];

    return (
        <div>
            {/* */}
        </div>
    );
}
