/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import {Link} from '@chakra-ui/react';

const MenuItems = ({children, href, isSelected}) => {
  const color = isSelected ? 'blue.500' : 'gray.500';

  return (
    <Link
      mt={{base: 4, md: 0}} mr={6}
      display="block"
      color={color}
      href={href}
    >
      {children}
    </Link>
  );
};

MenuItems.propTypes = {
  children: PropTypes.func.isRequired,
  href: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default MenuItems;
