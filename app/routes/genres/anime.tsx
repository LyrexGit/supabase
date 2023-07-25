import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';
import { useLocation, useNavigate } from '@remix-run/react';
import { motion, type PanInfo } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';

import { animeGenres } from '~/constants/filterItems';
import { BreadcrumbItem } from '~/components/elements/Breadcrumb';

export const handle = {
  breadcrumb: () => (
    <BreadcrumbItem to="/genres/anime" key="genres-anime">
      Anime
    </BreadcrumbItem>
  ),
  miniTitle: () => ({
    title: 'Genres',
    subtitle: 'Anime',
    showImage: false,
  }),
};

const AnimeGenresPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHydrated = useHydrated();
  const { t } = useTranslation('genres');

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset?.x > 100) {
      navigate('/genres/tv');
    }
    if (info.offset?.x < -100 && info.offset?.y > -50) {
      return;
    }
  };
  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col items-center justify-center px-3 sm:px-0"
      drag={isMobile && isHydrated ? 'x' : false}
      dragConstraints={isMobile && isHydrated ? { left: 0, right: 0 } : false}
      dragElastic={isMobile && isHydrated ? 0.7 : false}
      onDragEnd={handleDragEnd}
      dragDirectionLock={isMobile && isHydrated}
      draggable={isMobile && isHydrated}
    >
      <h4>{t('anime-genres')}</h4>
      <Spacer y={5} />
      <div className="xs:grid-cols-2 grid grid-cols-1 justify-center gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {animeGenres.map((genre) => (
          <Button
            key={genre}
            type="button"
            variant="flat"
            color="primary"
            onPress={() => navigate(`/discover/anime?genres=${genre}`)}
          >
            {genre}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimeGenresPage;