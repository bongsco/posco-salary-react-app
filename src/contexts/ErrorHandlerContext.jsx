import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';
import Notice from '#components/Notice';

const ErrorHandlerContext = createContext();

export function ErrorHandlerProvider({ children }) {
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
  };

  const removeError = (id) => {
    setErrors((prevErrors) => prevErrors.filter((e) => e.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorHandlerContext.Provider
      value={useMemo(() => ({ errors, addError, clearErrors }), [errors])}
    >
      {errors.map((error) => (
        <Notice
          key={error.id}
          title={error.title}
          message={error.message}
          onClose={() => removeError(error.id)}
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
