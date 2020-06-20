import React from 'react';
import propTypes from 'prop-types';
import styles from './ContactItem.module.css';

const ContactItem = ({ contactItem, onRemoveContact }) => {
  const { name, number } = contactItem;

  return (
    <div className={styles.container}>
      <p>
        {name}
        <span> : </span>
        <span>{number}</span>
      </p>
      <button
        className={styles.buttonDelete}
        onClick={onRemoveContact}
        type="button"
      >
        {null}
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contactItem: propTypes.shape({
    name: propTypes.string.isRequired,
    number: propTypes.string.isRequired,
  }).isRequired,
  onRemoveContact: propTypes.func.isRequired,
};

export default ContactItem;
