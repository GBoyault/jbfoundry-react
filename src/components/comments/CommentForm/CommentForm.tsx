import { FormEvent } from "react";
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useInput } from "../../../hooks";
import classes from './CommentForm.module.css'
import { isNotEmpty, isEmail } from "../../../utils";
import { commentPostDataType } from "../../../models";

type CommentFormPropsType = {
  onSubmit: (commentData: commentPostDataType) => void
}

export const CommentForm = ({ onSubmit }: CommentFormPropsType) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty)

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail)

  const {
    value: messageValue,
    isValid: messageIsValid,
    hasError: messageHasError,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: resetMessage,
  } = useInput(isNotEmpty)

  const formIsValid = nameIsValid && emailIsValid && messageIsValid

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formIsValid) {
      return;
    }

    const commentData: commentPostDataType = {
      author_name: nameValue,
      author_email: emailValue,
      content: messageValue
    }

    onSubmit(commentData)

    resetName()
    resetEmail()
    resetMessage()
  };

  return (
    <div className={classes['comment-form']}>
      <h3>Laisser un commentaire</h3>
      <p>
        <small>Votre adresse e-mail ne sera pas publiée.</small>
      </p>
      <form onSubmit={submitHandler}>
        <div className={classes.col}>
          <FormControl>
            <TextField
              type='text'
              multiline
              rows={5}
              id="message"
              label="Votre Message"
              value={messageValue}
              onChange={messageChangeHandler}
              onBlur={messageBlurHandler}
              variant="outlined"
              error={messageHasError}
              helperText={messageHasError ? 'Veuillez écrire un commentaire valide' : ''}
              required
            />
          </FormControl>
        </div>
        <div className={classes['col-6']}>
          <FormControl>
            <TextField
              type='text'
              id="name"
              label="Nom"
              value={nameValue}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              variant="standard"
              error={nameHasError}
              helperText={nameHasError ? 'Veuillez entrez un nom' : ''}
              required
            />
          </FormControl>
        </div>
        <div className={classes['col-6']}>
          <FormControl>
            <TextField
              type='email'
              id="email"
              label="Email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              variant="standard"
              error={emailHasError}
              helperText={emailHasError ? 'Veuillez entrez un email valide' : ''}
            />
          </FormControl>
        </div>
        <div className={classes.col}>
          <button
            className={classes.submit}
            type="submit"
            disabled={!formIsValid}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div >
  )
}