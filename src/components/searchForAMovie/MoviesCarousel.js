import React from 'react';
import Slider from 'react-slick';

function MoviesCarousel({ recentlySearched }) {

    const settings = {
        infinite: true,
        arrows: true,
        speed: 300,
        // autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="carousel-container">
            <Slider {...settings}>
                {Object.values(recentlySearched).map((movie, key) => {
                    return (
                        <div className="carousel-item" key={key}>
                            <p className="carousel-item__title" >{movie.title}</p>
                            <img className="carousel-item__poster" src={movie.poster} alt="movie-poster"></img>
                        </div>
                    )
                }
                )}
            </Slider>
        </section>
    );
}

export default MoviesCarousel;