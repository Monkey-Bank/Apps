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
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        containerClassName={'pagination'} // ページネーションであるulに着くクラス名
        activeClassName={'active'} // アクティブなページのliに着くクラス名
        previousClassName={'pagination__previous'} // 「<」のliに着けるクラス名
        nextClassName={'pagination__next'} // 「>」のliに着けるクラス名
        disabledClassName={'pagination__disabled'} // 使用不可の「<,>」に着くクラス名
      />
    </div>
  );
}

export default Pagination;
