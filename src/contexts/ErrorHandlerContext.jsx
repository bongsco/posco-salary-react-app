import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import Notice from '#components/Notice';

const ErrorHandlerContext = createContext();

export function ErrorHandlerProvider({ children }) {
  const [errors, setErrors] = useState({});

  const addError = (title, message, id = crypto.randomUUID()) => {
    setErrors((prevErrors) => ({ ...prevErrors, [id]: { title, message } }));
    return id;
  };

  const removeError = useCallback(
    (id) => {
      const newErrors = { ...errors };
      delete newErrors[id];

      setErrors(newErrors);
    },
    [errors],
  );

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorHandlerContext.Provider
      value={useMemo(
        () => ({ errors, addError, clearErrors, removeError }),
        [errors, removeError],
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
