import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';
import Notice from '#components/Notice';
import createErrorNotice from '#utils/error';

const ErrorHandlerContext = createContext();

export function ErrorHandlerProvider({ children }) {
  const [errors, setErrors] = useState({});

  const addError = (title, message, id) => {
    const error = createErrorNotice(title, message, id);
    setErrors((prevErrors) => ({ ...prevErrors, [error.id]: error }));

    return error.id;
  };

  const removeError = (id) => {
    const newErrors = { ...errors };
    delete newErrors[id];

    setErrors(newErrors);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorHandlerContext.Provider
      value={useMemo(
        () => ({ errors, addError, clearErrors, removeError }),
        [errors],
      )}
    >
      {Object.keys(errors).map((errorId) => (
        <Notice
          key={errorId}
          title={errors[errorId].title}
          message={errors[errorId].message}
          onClose={() => removeError(errorId)}
        />
      ))}
      {children}
    </ErrorHandlerContext.Provider>
  );
}

ErrorHandlerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useErrorHandlerContext() {
  const context = useContext(ErrorHandlerContext);

  if (!context) {
    throw new Error(
      'useErrorHandlerContext must be used in the scope of ErrorHandlerProvider',
    );
  }

  return context;
}
