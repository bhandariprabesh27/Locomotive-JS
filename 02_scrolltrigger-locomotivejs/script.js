// Yo talako 4 line code use nagarne
// const scroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true,
// });

// https://codepen.io/GreenSock/pen/ExPdqKy - Yo website bata JS code uthaune
//IMPORTANT -> Red panel bata purple panel samma hataune, purple panel paxi ko tl. wala code pni hataune

// .smooth-scroll lai commnd+D garne ra vako sabai .smooth-scroll lai #main ma change garne

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

gsap.from("#page1 #box", {
  scale: 0,
  duration: 1,
  delay: 1,
  opacity: 0,
  rotate: 360,
});
gsap.from("#page2 #box", {
  scale: 0,
  duration: 1,
  opacity: 0,
  rotate: 360,
  scrollTrigger: {
    trigger: "#page2 #box",
    scroller: "#main", //gsap matra use vako cha vane body, but locomotive use vako xa vane #main(enclosing tag) chai trigger hunxa
    start: "top 50%",
    markers: true,
  },
});
