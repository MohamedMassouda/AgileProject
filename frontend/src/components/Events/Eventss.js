import React from 'react'

    export const Eventss = [
        {
            id: 1,
            title: 'The Great Gatsby',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lln6jE_V4ZzHmjvBPLceaIan_95pAMrQx6GeoY8-HA&s',
            date: "April 10, 192",
            location: 'New York',
            description: 'The Great Gatsby, novel by American author F. Scott Fitzgerald, published in 1925. It tells the story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth. Set in 1920s New York, the book is narrated by Nick Carraway'
        },
        {
            id: 2,
            title: 'Smart Contract with us',
            imageUrl: 'https://cdn-az.allevents.in/events5/banners/9bc5b1b6926cd7200ccc7efdb332b39d45b15d6c303dec570a7f558cf08bac98-rimg-w940-h470-gmir.jpg?v=1711668222',
            date: 'May 07,2024',
            location: 'Tunis',
            description: 'MART has vehicles and shelters where businesses can advertise their products and/or services to the public. Transit advertising is noticeable and cost-effective. Dollar per dollar, transit advertising reaches more people than any other form of advertising. Catch your customer’s eye at every turn.'
        },
        {
            id: 3,
            title: 'IE Experience Day Tunisia',
            imageUrl: 'https://cdn-az.allevents.in/events5/banners/9bc5b1b6926cd7200ccc7efdb332b39d45b15d6c303dec570a7f558cf08bac98-rimg-w940-h470-gmir.jpg?v=1711668222',
            date: 'April 22,2024',
            location: 'Tunis',
            description: 'IE offers an education like no other - career focused, multidisciplinary, big picture, and refreshingly practical.'
        },
        {
            id: 4,
            title: 'Holi Festival',
            imageUrl: 'https://chicagoparent.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2022/03/calendar-holi-photo-credit-istock-BartoszHadyniak-746x500.jpg',
            date: 'March 25,2024',
            location: 'India',
            description: 'Holi is considered as one of the most revered and celebrated festivals of India and it is celebrated in almost every part of the country. It is also sometimes called as the “festival of love” as on this day people get to unite together forgetting all resentments and all types of bad feeling towards each other. The great Indian festival lasts for a day and a night, which starts in the evening of Purnima or the Full Moon Day in the month of Falgun. It is celebrated with the name Holika Dahan or Choti Holi on first evening of the festival and the following day is called Holi. In different parts of the country it is known with different names.'
        },
        {
            id: 5,
            title: 'Lantern Festival',
            imageUrl: 'https://afar.brightspotcdn.com/dims4/default/f584376/2147483647/strip/false/crop/2000x1333+0+0/resize/1486x990!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fc0%2Fd7%2F999a7a0d498197b219b00115cecb%2Foriginal-lantern-festival-floating.jpg',
            date: 'Feb 12.2025',
            location: 'China',
            description: 'Lantern Festival, holiday celebrated in China and other Asian countries that honours deceased ancestors on the 15th day of the first month (Yuan) of the lunar calendar. The Lantern Festival aims to promote reconciliation, peace, and forgiveness.'
        },
        {
            id: 6,
            title: 'Mardi Gras',
            imageUrl: 'https://monacorona.com/wp-content/uploads/2023/03/mardi-gras-parades.jpg',
            date: 'Mar 4 , 2025',
            location: 'City of New Orleans',
            description: 'Mardi Gras, festive day celebrated in France on Shrove Tuesday (the Tuesday before Ash Wednesday), which marks the close of the pre-Lenten season. The French name Mardi Gras means Fat Tuesday, from the custom of using all the fats in the home before Lent in preparation for fasting and abstinence.'
        },
    ];

    export default function Event({ event }) {
        return (
          <div className="event">
            <img src={event.imageUrl} alt={event.title} />
            <h2>{event.title}</h2>
          </div>
        );
      }
    