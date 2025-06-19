import { type Album } from './Pagination';

interface Props {
  albums: Album[];
  currentAlbums: Album[];
}

function AlbumList(props: Props) {
  const { currentAlbums } = props;

  return (
    <div className="albumGridWrapper">
      {currentAlbums.map((album) => (
        <div key={album.id}>
          <p className="albumCard">{album.id}</p>
        </div>
      ))}
    </div>
  );
}

export default AlbumList;
