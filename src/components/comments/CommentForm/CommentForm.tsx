import { FormEvent, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useInput } from '../../../hooks';
import { commentPostDataType, Comment } from '../../../models';
import { isNotEmpty, isEmail } from '../../../utils';
import classes from './CommentForm.module.css';

type CommentFormPropsType = {
  onSubmit: (commentData: commentPostDataType) => void;
  onCancelReply: () => void;
  replyTo: Comment | null;
};

export const CommentForm = forwardRef<HTMLDivElement, CommentFormPropsType>(
  ({ onSubmit, onCancelReply, replyTo }, ref) => {
    const {
      value: nameValue,
      isValid: nameIsValid,
      hasError: nameHasError,
      valueChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
    } = useInput(isNotEmpty);

    const {
      value: emailValue,
      isValid: emailIsValid,
      hasError: emailHasError,
      valueChangeHandler: emailChangeHandler,
      inputBlurHandler: emailBlurHandler,
      reset: resetEmail,
    } = useInput(isEmail);

    const {
      value: messageValue,
      isValid: messageIsValid,
      hasError: messageHasError,
      valueChangeHandler: messageChangeHandler,
      inputBlurHandler: messageBlurHandler,
      reset: resetMessage,
    } = useInput(isNotEmpty);

    const formIsValid = nameIsValid && emailIsValid && messageIsValid;

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!formIsValid) {
        return;
      }

      const commentData: commentPostDataType = {
        author_name: nameValue,
        author_email: emailValue,
        content: messageValue,
      };

      if (replyTo) {
        commentData.parent = replyTo.id;
        commentData.depth = replyTo.depth;
      }

      onSubmit(commentData);

      resetName();
      resetEmail();
      resetMessage();
    };

    const cancelReplyHandler = () => {
      resetName();
      resetEmail();
      resetMessage();
      onCancelReply();
    };

    return (
      <div className={classes['comment-form']} ref={ref}>
        <h3>
          {replyTo
            ? `Répondre à ${replyTo.author_name}`
            : 'Laisser un commentaire'}
        </h3>
        {replyTo && (
          <button
            className={classes['cancel-reply-button']}
            onClick={cancelReplyHandler}
          >
            Annuler votre réponse
          </button>
        )}
        <form onSubmit={submitHandler}>
          <div className={classes.col}>
            <FormControl>
              <TextField
                type="text"
                multiline
                rows={5}
                id="message"
                label="Votre Message"
                value={messageValue}
                onChange={messageChangeHandler}
                onBlur={messageBlurHandler}
                variant="outlined"
                error={messageHasError}
                helperText={messageHasError ? 'Veuillez écrire un message' : ''}
                required
              />
            </FormControl>
          </div>
          <div className={classes['col-6']}>
            <FormControl>
              <TextField
                type="text"
                id="name"
                label="Nom"
                value={nameValue}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                variant="standard"
                error={nameHasError}
                helperText={nameHasError ? 'Veuillez entrez votre nom' : ''}
                required
              />
            </FormControl>
          </div>
          <div className={classes['col-6']}>
            <FormControl>
              <TextField
                type="email"
                id="email"
                label="Email"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                variant="standard"
                error={emailHasError}
                helperText={
                  emailHasError ? 'Veuillez entrez un email valide' : ''
                }
              />
            </FormControl>
            <p>
              <small>Votre adresse e-mail ne sera pas publiée.</small>
            </p>
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
      </div>
    );
  }
);
