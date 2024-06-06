import React, { useEffect, useState } from "react";
import Style from "./P4.module.css";

const URL = "https://fakestoreapi.com/products";

const P4 = () => {
    const [images, setImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);

    const getImages = async () => {
        const response = await fetch(URL);

        const data = await response.json();

        const images = data.map((item) => item.image);

        setImages(images);
    };

    const addImageCircle = () => {
        const imageCircle = [];

        images.map((image, index) => {
            imageCircle.push(
                <div
                    key={index}
                    className={`${Style.imageCircle}
                        ${index === imageIndex && Style.imageCircleActive}`}
                    onClick={() => setImageIndex(index)}
                ></div>
            );
        });

        return imageCircle;
    };

    const nextImage = () => {
        if (imageIndex >= images.length - 1) {
            setImageIndex(0);
        } else {
            setImageIndex((prevState) => prevState + 1);
        }
    };

    const pastImage = () => {
        if (imageIndex === 0) {
            setImageIndex(images.length - 1);
        } else {
            setImageIndex((prevState) => prevState - 1);
        }
    };

    useEffect(() => {
        getImages();

        // const interval = setInterval(nextImage, 2000);

        // return () => clearInterval(interval);
    }, []);

    return (
        <div className={Style.container}>
            <div className={Style.navBtn} onClick={pastImage}>
                &lt;
            </div>

            <div className={Style.imageContainer}>
                <div
                    className={Style.image}
                    style={{ backgroundImage: `url(${images[imageIndex]})` }}
                ></div>
                <div className={Style.circleContainer}>{addImageCircle()}</div>
            </div>

            <div className={Style.navBtn} onClick={nextImage}>
                &gt;
            </div>
        </div>
    );
};

export default P4;
