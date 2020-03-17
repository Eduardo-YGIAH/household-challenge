import React from 'react';
import './MemberCard.scss';
import Button from './Button';

export default function MemberCard({ name, email }) {
  const btnDelete = {
    label: 'Remove',
    link: '#',
    onclick: () => {
      //TODO: REMOVE MEMBER
    },
    style: 'small-danger',
  };

  return (
    <div className='card__member'>
      <div className='card__member-body'>
        <img
          className='card__member-avatar'
          src='https://res.cloudinary.com/ygiah/image/upload/v1584371821/bsqweejlwsx8zs5nqhek.jpg'
          alt='#'
        />
        <div className='card__member-details'>
          <h4 className='card_member-name'>{name}</h4>
          <p className='card__member-email'>{email}</p>
        </div>
      </div>
      <Button btn={btnDelete} />
    </div>
  );
}
