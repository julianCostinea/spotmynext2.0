import Image from 'next/image';
import { useState } from 'react';
import * as Icons from '../UI/Icons/Icons';

import classes from './NewRecommendation.module.css';

function NewRecommendation(props) {
  const [voted, setVoted] = useState(false);

  function voteUpNewRecommendation(event) {
    event.preventDefault();
    const itemData = { id: props.id, title: props.title, photo: props.photo };
    if (voted) {
      props.voteButtonHandler(false, itemData);
      setVoted(false);
      return;
    }
    props.voteButtonHandler(true, itemData);
    setVoted(true);
  }
  return (
    <div className={classes.newRecommendation}>
      <Image
        alt={props.title}
        width={40}
        height={40}
        src={`/images/itemsPhotos/${props.photo}`}
      />
      <p>{props.title}</p>
      <button
        title="Recommend this title"
        className={`${classes.voteUpButton} ${
          voted ? classes.voteUpButtonActive : null
        }`}
        onClick={voteUpNewRecommendation}
      >
        {Icons.ThumbsupIcon}
      </button>
    </div>
  );
}
export default NewRecommendation;
