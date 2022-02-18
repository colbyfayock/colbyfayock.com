import { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { getPage } from '@cloudinary/url-gen/actions/extract';

import Button from 'components/Button';

import styles from './PdfSlider.module.scss';

const PRELOAD_BEFORE = 1;
const PRELOAD_AFTER = 2;

let cld;

function getPdfPage({ src, page }) {
  return cld
    .image(src)
    .setDeliveryType('fetch')
    .format('auto')
    .quality('auto')
    .extract(getPage().byNumber(page))
    .toURL();
}

const PdfSlider = ({ className, src, width, height, cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME }) => {
  let sliderClassName = styles.pdfSlider;

  if (className) {
    sliderClassName = `${sliderClassName} ${className}`;
  }

  const [currentSlide, setCurrentSlide] = useState(1);
  const [pages = {}, setPages] = useState({});
  const [totalPages, setTotalPages] = useState();

  const slides = Object.keys(pages).map((key) => {
    return {
      src: pages[key],
      pageNumber: parseInt(key),
    };
  });

  const hasNextSlide = slides.find(({ pageNumber }) => currentSlide + 1 === pageNumber);

  useEffect(() => {
    cld = new Cloudinary({
      cloud: {
        cloudName,
      },
      url: {
        secure: true,
      },
    });
  }, []);

  // Get the first page and refresh the

  useEffect(() => {
    const page = getPdfPage({ src, page: 1 });
    setPages({ 1: page });
  }, [src]);

  useEffect(() => {
    (async function run() {
      const newPages = { ...pages };

      const slidesToLoad = [currentSlide];

      [...new Array(PRELOAD_BEFORE)]
        .map((nothing, index) => index + 1)
        .forEach((n) => slidesToLoad.push(currentSlide - n));
      [...new Array(PRELOAD_AFTER)]
        .map((nothing, index) => index + 1)
        .forEach((n) => slidesToLoad.push(currentSlide + n));

      // Look through the current slide and next slides to try to preload any
      // new or previous slides depending on the position, but only do so
      // if we don't already have it loaded

      await Promise.all(
        slidesToLoad.map(async (slideNumber) => {
          // If the slide already exists, we don't need to preload it

          if (newPages[slideNumber]) return;

          // Don't try to load slides before the first one

          if (slideNumber < 1) return;

          const slide = getPdfPage({ src, page: slideNumber });
          const imageExists = await fetch(slide).then((res) => res.ok);

          if (imageExists) {
            newPages[slideNumber] = slide;
          } else {
            // If our next image doesn't exist, that means we're at the end of
            // the PDF so we want to additionally set our total pages to prevent
            // further navigation and loading attempts

            setTotalPages(Object.keys(newPages).length);
          }
        })
      );

      setPages(newPages);
    })();
  }, [currentSlide]);

  function handleOnNextSlide() {
    setCurrentSlide(currentSlide + 1);
  }

  function handleOnPrevSlide() {
    if (currentSlide - 1 <= 0) return;
    setCurrentSlide(currentSlide - 1);
  }

  return (
    <>
      <div className={sliderClassName}>
        {slides.length > 0 && (
          <>
            <ul
              className={styles.slides}
              style={{
                aspectRatio: `${width} / ${height}`,
              }}
            >
              {slides.map(({ src, pageNumber }) => {
                return (
                  <li
                    key={src}
                    className={styles.slide}
                    data-is-active-slide={currentSlide === pageNumber}
                    data-is-prev-slide={currentSlide === pageNumber - 1}
                    data-is-next-slide={currentSlide === pageNumber + 1}
                    data-should-preload={
                      pageNumber - currentSlide >= -PRELOAD_BEFORE && pageNumber - currentSlide <= PRELOAD_AFTER
                    }
                  >
                    <img src={src} alt={`Page ${pageNumber}`} loading="lazy" />
                  </li>
                );
              })}
            </ul>
            <ul className={styles.controls}>
              <li>
                <Button onClick={handleOnPrevSlide} disabled={currentSlide - 1 <= 0}>
                  Prev
                </Button>
              </li>
              <li>
                <Button onClick={handleOnNextSlide} disabled={totalPages === currentSlide || !hasNextSlide}>
                  Next
                </Button>
              </li>
              <li className={styles.controlsDownload}>
                <a href={src} download target="_blank" rel="noreferrer">
                  Download Slides
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default PdfSlider;
