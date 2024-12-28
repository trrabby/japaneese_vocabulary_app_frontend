/* eslint-disable react/no-unescaped-entities */
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { SiSkypeforbusiness } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Element, Link as ScrollLink } from "react-scroll";
import { FaAngleDoubleUp } from "react-icons/fa";

export const Footer = () => {
  // console.log(user)
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
      // setLoading(false)
    });
  }, []);
  const particlesLoaded = () => {
    // console.log(container);
  };

  const social = (
    <ul
      data-aos="fade-up"
      data-aos-duration="1000"
      className="mt-8 flex gap-6 social"
    >
      <a href="https://facebook.com/profile.trrabby" target="_blank">
        <FiFacebook />
      </a>
      <a href="https://linkedin.com/in/towfiqueWeb" target="_blank">
        <SlSocialLinkedin />
      </a>
      <a href="https://github.com/trrabby " target="_blank">
        <FaGithub />
      </a>
      <a href="https://twitter.com/towfique_veer" target="_blank">
        <FiTwitter />
      </a>
      <a href="https://join.skype.com/invite/wj2WRec0GlAB" target="_blank">
        <SiSkypeforbusiness />
      </a>
    </ul>
  );

  return (
    <div>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                // value: theme = "light" ? "#b3ffe6" : "#1a1a00",
              },
            },
            fpsLimit: 100,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: { value: "#4d4d00" },
              // {value:`${theme = "light" ? "#99ffcc" : "#4d4d00"}`},
              links: {
                color: "#1ABC9C",
                distance: 150,
                enable: false,
                opacity: 0.1,
                width: 1,
              },
              move: {
                direction: "up",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 15,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "triangle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      <Element name="footer">
        <footer className="bg-accent text-white py-8 rounded-t-xl">
          <div className="relative mx-auto max-w-screen-xl px-4 md:py-10 lg:px-8 lg:py-10 lg:pt-0 flex flex-col w-full ">
            <div className="lg:flex lg:items-center lg:justify-between text-fourth w-full ">
              <div
                data-aos="fade-down"
                data-aos-duration="1000"
                className="w-full"
              >
                <div className="flex justify-center items-center">
                  <Link
                    to={"/"}
                    className="mr-4 ml-2 cursor-pointer py-1.5 flex gap-2 md:text-2xl text-sm items-center font-extrabold"
                  >
                    <p className="text-primary text-8xl font-extrabold p-2 px-4">
                      <span className="text-cyan-500 text-8xl">Tokyo</span>{" "}
                      Bangla
                    </p>
                  </Link>
                </div>

                <p className="mx-auto mt-6 md:w-8/12 text-center md:text-lg text-base leading-relaxed text-primary">
                  "Bridging cultures through language. Master Japanese with ease
                  and embark on a journey of lifelong learning!"
                </p>
              </div>

              <div className="md:hidden">{social}</div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="flex gap-4 mt-6 w-full mx-auto text-center justify-center p-4 rounded-lg"
            >
              <a
                href="https://github.com/trrabby"
                target="_blank"
                className=" transition hover:opacity-75 p-0 m-0"
              >
                {" "}
                Collaborate Developer{" "}
              </a>

              <a href={"/contacts"}>Contact Us </a>
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="lg:w-4/12 mx-auto text-center text-sm border-x-2 border-accent text-fourth font-bold pt-5">
              Copyright &copy; 2024. All rights reserved.
            </div>

            <ScrollLink
              className="absolute right-12 text-black bg-white p-4 rounded-full hover:bg-primary hover:cursor-pointer duration-500"
              to="banner_scroll"
              smooth={true}
              duration={500}
            >
              <FaAngleDoubleUp />
            </ScrollLink>
          </div>
        </footer>
      </Element>
    </div>
  );
};
