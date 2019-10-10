const props = {
  contentBox: 'body',
  contentFontSizeNormal: 10,
  contentZone: 0,
  contentBoxHeight: 640,
  contentBoxWidth: 640,

  scaleUpBreakPointX: 1600,
  scaleUpBreakPointY: 900,
  widthToHeight: 1.7
};

const calc = {
  widthContent: 0,
  heightContent: 0,
  widthSuccess: 0,
  heightSuccess: 0
};

function updateSizes() {
  calc.widthContent = document.querySelector(props.contentBox).offsetWidth;
  calc.heightContent = document.querySelector(props.contentBox).offsetHeight;
  calc.heightSuccess = window.innerHeight - props.contentZone;
  calc.widthSuccess = window.innerWidth - props.contentZone;
}

function update() {
  updateSizes();

  const differentHeight = calc.heightSuccess - props.contentBoxHeight;
  const differentWidth = calc.widthSuccess - props.contentBoxWidth;

  let scall;

  if (calc.widthSuccess > props.scaleUpBreakPointX && calc.heightSuccess > props.scaleUpBreakPointY) {
    if (calc.widthSuccess / calc.heightSuccess <= props.widthToHeight) {
      scall = calc.widthSuccess / props.scaleUpBreakPointX;
    } else {
      scall = calc.heightSuccess / props.scaleUpBreakPointY;
    }
  } else {
    if (differentHeight < 0) {
      scall = (props.contentBoxHeight - Math.abs(differentHeight)) / props.contentBoxHeight;
      if (scall < .3) {
        scall = .3;
      }
    } else {
      scall = 1;
    }

    if (differentWidth < 0) {
      const scallWidth = (props.contentBoxWidth - Math.abs(differentWidth)) / props.contentBoxWidth;

      if (scallWidth < scall) {
        scall = scallWidth;
      }
      if (scall < .3) {
        scall = .3;
      }
    }
  }

  const fontSize = scall * props.contentFontSizeNormal;

  document.querySelector('html').style.fontSize = `${fontSize}px`;
}

module.exports = {
  update: update
};
