import { useState, useEffect } from 'react';

import getImages from 'api/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [showModal, setShowModal] = useState(false);

  const search = searchParameter => {
    if (searchParameter !== query || page !== 1) {
      setImages([]);
    }
    setQuery(searchParameter);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
  };

  const openModal = image => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    async function getData() {
      const data = await getImages(query, page);
      setImages(prevImages => {
        return [...prevImages, ...data.hits];
      });
      setLoadMoreBtn(page < Math.ceil(data.totalHits / 12));
      setLoader(false);
    }
    setLoader(true);
    getData();
  }, [page, query]);

  return (
    <div className="App">
      <Searchbar onSubmit={search} />
      <ImageGallery images={images} openModal={openModal} />
      {loadMoreBtn && <LoadMoreButton onClick={loadMore} />}
      {loader && <Loader />}
      {showModal && <Modal image={modalImage} closeModal={closeModal} />}
    </div>
  );
};

export { App };
