import { useEffect, useState } from 'react';
import AlbumList from './AlbumList';
import ReactPaginate from 'react-paginate';

export interface Album {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

function Pagination() {
  const [albums, setAlbums] = useState<Album[]>([]);

  const itemsPerPage = 6; //表示したい数
  const [itemsOffset, setItemsOffset] = useState(0);
  const endOffset = itemsOffset + itemsPerPage;
  const currentAlbums = albums.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(albums.length / itemsPerPage);

  useEffect(() => {
    const getAlbums = async () => {
      await fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
        .then((res) => res.json())
        .then((albums) => setAlbums(albums));
    };
    getAlbums();
  }, []);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % albums.length;
    setItemsOffset(newOffset);
  };

  return (
    <div>
      <AlbumList albums={albums} currentAlbums={currentAlbums} />
      <div className="paginationWrapper">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          nextLabel="next >"
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Pagination;
