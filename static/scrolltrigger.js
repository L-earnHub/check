gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector(".container");

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true,
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed",
});

window.addEventListener("load", function () {
  const pinWrap = document.querySelector(".pin-wrap");
  const periodicTable = document.querySelector("#container");

  // Center the periodic table
  gsap.set(periodicTable, {
    xPercent: -50,
    yPercent: -50,
    top: "50%",
    left: "50%",
    position: "absolute",
  });

  // Pinning and zoom effect for sectionPin
  gsap.to(".pin-wrap", {
    scale: 1.5,
    scrollTrigger: {
      scroller: pageContainer, // Locomotive-scroll container
      trigger: "#sectionPin",
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      onEnter: () => console.log("Entered pinned section"),
      onLeave: () => console.log("Leaving pinned section"),
    },
  });

  // Animation for transitioning to the next section
  gsap.fromTo(
    "#nextSection .content-wrap",
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        scroller: pageContainer,
        trigger: "#nextSection",
        start: "top 80%",
        end: "top 40%",
        scrub: true,
      },
    }
  );

  // Animation for other sections (if applicable)
  gsap.fromTo(
    ".sectionOther",
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        scroller: pageContainer,
        trigger: ".sectionOther",
        start: "top 75%",
        end: "bottom 25%",
        scrub: true,
      },
    }
  );

  ScrollTrigger.addEventListener("refresh", () => scroller.update()); // Sync LocomotiveScroll with ScrollTrigger
  ScrollTrigger.refresh();
});
