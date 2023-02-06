import { useState } from 'react';
import Modal from '../components/Modal';
import classes from './NewPost.module.css';
import { Link } from 'react-router-dom';

function NewPost({ onAddPost }) {
  /*   const stateData = useState('');
  stateData[0]; //current value
  stateData[1]; //state updating function */
  // const [modalIsVisible, setModalIsVisible] = useState(true);
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  /*   function hideModalHandler() {
    setModalIsVisible(false);
  } */

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
    console.log(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };
    onAddPost(postData);
    onCancel();
  }

  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
        </p>

        <p>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            required
            onChange={authorChangeHandler}
          />
        </p>

        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;

// 7.) Kada stisnemo na cancel u modal prozoru za novi post, želimo da se zatvori i koristimo Link umjesto button (<button type="button" onClick={onCancel}> ->  <Link to=".." type="button">).
