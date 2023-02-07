import axios from 'axios';

const API_KEY = "20177896-1cf321c1d71fc21c86755b502"

const FetchService = async (searchQuery, page) => {
  return await axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
};

export default FetchService;
