import PropTypes from 'prop-types';
import BreadCrumbs from '#components/BreadCrumbs';

export default function AppLayout({ title, children, breadCrumbs }) {
  return (
    <>
      <BreadCrumbs items={breadCrumbs} />
      <h1>{title}</h1>
      {children}
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  breadCrumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
