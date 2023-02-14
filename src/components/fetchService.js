import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = "20177896-1cf321c1d71fc21c86755b502"

const FetchService = async (searchQuery, page) => {
  return await axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
};
FetchService.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default FetchService;
