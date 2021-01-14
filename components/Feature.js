/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import {Box, Heading, Text} from '@chakra-ui/react';

const Feature = ( {title, desc, ...rest} ) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Feature;
