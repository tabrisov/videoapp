function fadeIn(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: '0', transition: 'none'})
    .to(el, .3, {opacity: '1', clearProps: 'opacity, transition'}, delay);
}

function fadeOut(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: '1', transition: 'none'})
    .to(el, .3, {opacity: '0'}, delay);
}

function scaleIn(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {scale: '0', transition: 'none'})
    .to(el, .3, {scale: '1', clearProps: 'scale, transition'}, delay);
}

function scaleOut(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {scale: '1', transition: 'none'})
    .to(el, .3, {scale: '0'}, delay);
}

module.exports = {
  fadeIn: fadeIn,
  fadeOut: fadeOut,
  scaleIn: scaleIn,
  scaleOut: scaleOut
};
