import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";
import Image from "next/image";
import profilePicture from "public/profile/prof_image.png";

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
  className="w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative mb-24"
  style={{ opacity: 0 }}
>
  <style global jsx>
    {`
      .typed-cursor {
        font-size: 2rem;
      }
    `}
  </style>

  {/* Left side - Text */}
  <div className="flex flex-col pt-20 md:pt-0 select-none md:w-1/2">
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

  {/* Right side - Image */}
  <div
    ref={imageRef}
    className="mt-10 md:mt-0 md:w-1/2 flex justify-center lg:justify-end rounded-lg overflow-hidden"
  >
    <Image
      src={profilePicture}
      alt="John Rey Sasi"
      width={400}
      height={400}
      className="object-contain rounded-lg"
      priority
    />
  </div>
</section>

  );
};

export default Hero;
