import React, { useState, useRef, useEffect } from "react";
import Game from "../types/Game";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

function VideoModal({
  gameObj,
  onClose,
}: {
  gameObj: Game;
  onClose: () => void;
}) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSlideChange = () => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl">
        <h3 className="font-bold text-lg mb-4">
          {gameObj.title} — Videos ({gameObj.video_gallery.length})
        </h3>

        {/* Main Video Swiper */}
        <Swiper
          navigation={true}
          modules={[Navigation, Thumbs, FreeMode]}
          onSlideChange={handleSlideChange}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          style={
            {
              "--swiper-navigation-color": "#fff",
            } as React.CSSProperties
          }
        >
          {gameObj.video_gallery.map((v, i) => (
            <SwiperSlide key={i}>
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={v.src}
                controls
                className="w-full rounded-lg aspect-video"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbs Swiper */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="w-full mt-2"
        >
          {gameObj.video_gallery.map((v, i) => (
            <SwiperSlide
              key={i}
              className="cursor-pointer opacity-50 [&.swiper-slide-thumb-active]:opacity-100"
            >
              <video
                src={v.src}
                className="w-full object-cover aspect-video pointer-events-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}

function GameCard({ gameObj }: { gameObj: Game }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="card bg-base-100 shadow-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <figure className="w-full">
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
              width: "100%",
            } as React.CSSProperties
          }
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {gameObj.photo_gallery.map((p, i) => (
            <SwiperSlide key={i}>
              <img
                src={p.src || "https://via.placeholder.com/150"}
                className="w-full object-cover aspect-video"
              />
              {isHovering && (
                <div
                  className={"w-full h-full m-0 p-0 cursor-pointer flex-center"}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(128, 128, 128, 0.5)",
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  <i className="fa-solid fa-magnifying-glass fa-5x"></i>
                </div>
              )}
            </SwiperSlide>
          ))}
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={gameObj.photo_gallery}
          />
        </Swiper>
      </figure>
      {/* Thumbs Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        loop={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full mt-2"
      >
        {gameObj.photo_gallery.map((p, i) => (
          <SwiperSlide
            key={i}
            className="cursor-pointer opacity-50 [&.swiper-slide-thumb-active]:opacity-100"
          >
            <img
              src={p.src || "https://via.placeholder.com/150"}
              className="w-full object-cover aspect-video"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card-body">
        <h4 className="card-title">{gameObj.title}</h4>
        <div className="text-sm/5 font-bold">
          {!gameObj.sale_price && <span>${gameObj.regular_price}</span>}
          {gameObj.sale_price && (
            <>
              <span className="line-through text-gray-500">
                ${gameObj.regular_price}
              </span>
              <span className="text-orange-500 ml-2">
                ${gameObj.sale_price}{" "}
                {gameObj.discount_percent &&
                  `(${gameObj.discount_percent}% off)`}
              </span>
              <span className="text-orange-500 ml-2 italic">
                Sale Ends In{" "}
                {gameObj.discount_ends && `${gameObj.discount_ends} Days`}
              </span>
            </>
          )}
        </div>
        <div className="text-sm/5 m-0 p-0">
          For Nintendo Switch
          {gameObj.platform_code == "NINTENDO_SWITCH_2" && <span> 2</span>}
        </div>
        <div className="text-sm/5 p-0 m-0">
          Released on {new Date(gameObj.release_date).toLocaleDateString()}
        </div>
        {gameObj.file_size && (
          <div className="text-sm/5 m-0 p-0">{gameObj.file_size}</div>
        )}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          target="_blank"
          href={"https://www.nintendo.com/" + gameObj.url}
        >
          Go To eShop
        </a>
        {gameObj.video_gallery.length > 0 && (
          <a
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 cursor-pointer"
            onClick={() => setIsVideoOpen(true)}
          >
            Videos ({gameObj.video_gallery.length})
          </a>
        )}
      </div>
      {/* Video Modal */}
      {isVideoOpen && (
        <VideoModal gameObj={gameObj} onClose={() => setIsVideoOpen(false)} />
      )}
    </div>
  );
}

export default GameCard;
