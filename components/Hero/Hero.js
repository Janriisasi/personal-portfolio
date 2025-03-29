import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";
import Image from "next/image";
import profilePicture from "public/profile/profile.jpeg";

const options = {
  strings: TYPED_STRINGS,
  typeSpeed: 50,
  startDelay: 1500,
  backSpeed: 50,
  backDelay: 8000,
  loop: true,
};

const Hero = () => {
  const [lottie, setLottie] = useState(null);

  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "none" } })
        .to(sectionRef.current, { opacity: 1, duration: 2 })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          "<"
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, options);

    return () => typed.destroy();
  }, [typedElementRef]);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className="w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative mb-24"
      style={{ opacity: 0 }}
    >
      <style global jsx>
        {`
          .typed-cursor {
            font-size: 2rem;
          }
        `}
      </style>
      <div className="flex flex-col pt-40 md:pt-0 select-none">
        <h5
          className={`${styles.intro} font-mono font-medium text-indigo-light staggered-reveal`}
        >
          Hi, my name is
        </h5>
        <h1 className={`${styles.heroName} text-white text-6xl font-semibold`}>
          <span className="staggered-reveal">John Rey Sasi</span>
        </h1>
        <p>
          <span
            ref={typedElementRef}
            className="staggered-reveal text-3xl text-gray-light-3 font-mono leading-relaxed"
          />
        </p>
        <div className="staggered-reveal">
          <Profiles />
        </div>
        <div className="staggered-reveal pt-4">
          <Button href={`#${MENULINKS[4].ref}`} classes="link" type="primary">
            Let&apos;s Talk
          </Button>
        </div>
      </div>
       <div
        ref={imageRef}
        className="absolute w-full max-w-xs mx-auto
                  bottom-4 
                  sm:w-4/12 sm:mx-0 sm:right-4 
                  md:w-3/12 md:bottom-8 md:right-4
                  lg:w-4/12 lg:bottom-2 lg:right-12 
                  xl:w-3/12 2xl:right-16 
                  rounded-lg overflow-hidden flex justify-center"
        >       
        <Image
          src={profilePicture}
          alt="John Rey Sasi"
          width={400}
          height={500}
          className="object-fit"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
