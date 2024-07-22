import { Link } from 'react-router-dom';
import { useSearch } from '../Search/SearchContext';
import imagePaths from '../../../assets/imagePaths';

const discoverItems = [
  { title: 'Music', imgSrc: imagePaths.image5, bgColor: 'bg-pink-600', path: '/music' },
  { title: 'Podcasts', imgSrc: imagePaths.image6, bgColor: 'bg-green-700', path: '/podcasts' },
  { title: 'Live Events', imgSrc: imagePaths.image7, bgColor: 'bg-purple-600', path: '/live-events' },
  { title: 'Made For You', imgSrc: imagePaths.image8, bgColor: 'bg-blue-800', path: '/made-for-you' },
];

const genreItems = [
  { title: 'Pop', imgSrc: imagePaths.image4, bgColor: 'bg-green-500', genre: 'pop' },
  { title: 'Country', imgSrc: imagePaths.image3, bgColor: 'bg-orange-500', genre: 'country' },
  { title: 'Hip-Hop', imgSrc: imagePaths.image2, bgColor: 'bg-purple-500', genre: 'hip-hop' },
  { title: 'Rock', imgSrc: imagePaths.image1, bgColor: 'bg-blue-500', genre: 'rock' },
  { title: 'Indie', imgSrc: imagePaths.image6, bgColor: 'bg-red-500', genre: 'indie' },
  { title: 'Punk', imgSrc: imagePaths.image7, bgColor: 'bg-pink-500', genre: 'punk' },
  { title: 'Metal', imgSrc: imagePaths.image8, bgColor: 'bg-red-700', genre: 'metal' },
  { title: 'Instrumental', imgSrc: imagePaths.image5, bgColor: 'bg-gray-500', genre: 'instrumental' },
];

const SearchDefault = () => {
    const { setIsSearchActive, setSearchQuery } = useSearch();

    const handleItemClick = () => {
        setIsSearchActive(false);
        setSearchQuery('');
    };

  return (
    <div>
      <h2 className="text-2xl text-white mb-4">Browse all</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Discover Section */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mb-4">
          <h3 className="text-xl text-white mb-2">Discover</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {discoverItems.map((item, index) => (
              <Link to={item.path} key={index} onClick={() => handleItemClick()} className={`${item.bgColor} p-4 rounded-lg relative overflow-hidden`} style={{ minHeight: '150px' }}>
                <img src={item.imgSrc} alt={item.title} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                <h4 className="absolute bottom-2 left-2 text-white text-center bg-black bg-opacity-50 p-2 rounded-md">{item.title}</h4>
              </Link>
            ))}
          </div>
        </div>
        {/* Genres Section */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mb-4">
          <h3 className="text-xl text-white mb-2">Genres</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {genreItems.map((item, index) => (
              <Link to={`/genres/${item.genre}`} key={index} onClick={() => handleItemClick()} className={`${item.bgColor} p-4 rounded-lg relative overflow-hidden`} style={{ minHeight: '150px' }}>
                <img src={item.imgSrc} alt={item.title} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                <h4 className="absolute bottom-2 left-2 text-white text-center bg-black bg-opacity-50 p-2 rounded-md">{item.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDefault;
