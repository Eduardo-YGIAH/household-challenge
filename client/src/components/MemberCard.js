import React, { useEffect, useState } from 'react';
import './MemberCard.scss';
import Button from './Button';
import Axios from '../helperFunctions/axios.config';

export default function MemberCard({ id }) {
  const [members, setMembers] = useState(null);
  const [errors, setErrors] = useState(null);

  const btnDelete = {
    label: 'Remove',
    link: '#',
    onclick: () => {
      //TODO: REMOVE MEMBER
    },
    style: 'small-danger',
  };

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    let url = `/api/household/members/list/${id}`;
    Axios.get(url, { cancelToken: source.token })
      .then(res => {
        if (!unmounted) {
          const household = res.data.filter(el => el._id === id);
          setMembers(household[0].members);
          console.log(household[0].members);
        }
      })
      .catch(e => {
        if (!unmounted) {
          console.log(e);
          if (Axios.isCancel(e)) {
            console.log(`request cancelled: ${e.message}`);
          } else {
            console.log('another error happened:' + e.message);
            setErrors(e.message);
          }
        }
      });
    return () => {
      unmounted = true;
      source.cancel('Cancelling in Clean up');
    };
  }, [id]);

  return (
    <>
      {errors ? (
        <>
          <div>{errors}</div>
          <div>Please refresh.</div>
        </>
      ) : !members ? (
        <div>Loading...</div>
      ) : members.length === 0 ? (
        <div>Household has no members</div>
      ) : (
        members.map((member, index) => (
          <div key={index} className='card__member'>
            <div className='card__member-body'>
              <img className='card__member-avatar' src={member.avatar} alt='#' />
              <div className='card__member-details'>
                <h4 className='card_member-name'>{member.name}</h4>
                <p className='card__member-email'>{member.email}</p>
              </div>
            </div>
            <Button btn={btnDelete} />
          </div>
        ))
      )}
    </>
  );
}
