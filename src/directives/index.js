import { createApp } from 'vue';

export default {
  mounted: (el, binding) => {
    const valorDirective = binding.value;
    const isComponent = (valorDirective && typeof valorDirective.render === 'function');
    const component = (isComponent) ? binding.value : binding.value.component;
    const app = (isComponent) ? createApp(component) : createApp(component, binding.value.props);
    const hoverComponentInstance = app.mount(document.createElement('div'));
    
    el.addEventListener("mouseenter", () => {
      el.parentNode.insertBefore(hoverComponentInstance.$el, el);
      tooltipPosition(el);
    });
    el.addEventListener("mouseleave", () => {
        el.parentNode.removeChild(hoverComponentInstance.$el);
    });
  }
}

function tooltipPosition(el) {
  const wrapper = document.querySelector('.tooltipPersonalizado');

  wrapper.style.position = 'absolute';
  const elTop = getOffsetTop(el) - (wrapper.offsetHeight+5);
  const elBottom = getOffsetTop(el) + (el.offsetHeight+5);
  const elLeft = getOffsetLeft(el) - (wrapper.offsetWidth/2) + (el.offsetWidth/2);

  var retanguloEl = el.getBoundingClientRect();
  var consideraScrollTop = retanguloEl.top - (wrapper.offsetHeight+5);

  wrapper.style.top = `${(consideraScrollTop<0)?elBottom:elTop}px`;
  wrapper.style.left = `${(elLeft<0)?0:elLeft}px`;
  wrapper.classList.add('hover-component-wrapper');
}

function getOffsetTop(element) {
  let offsetTop = 0;

  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }

  return offsetTop;
}
function getOffsetLeft(element) {
  let offsetLeft = 0;

  while (element) {
    offsetLeft += element.offsetLeft;
    element = element.offsetParent;
  }

  return offsetLeft;
}
