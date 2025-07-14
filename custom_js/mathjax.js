// docs/javascripts/mathjax.js

window.MathJax = {
  // TeX 输入处理器的配置
  tex: {
    // 加载 ams 扩展包，它包含了 \mathbf, \mathrm 等命令
    packages: {'[+]': ['ams']}
  },
  // 启动序列的配置
  startup: {
    // 当 MathJax 准备好启动时，运行此函数
    ready: () => {
      console.log('MathJax 已准备好进行配置。');
      
      // 运行默认的启动序列
      MathJax.startup.defaultReady();

      // 当核心排版过程完成后，运行我们的自定义代码
      MathJax.startup.promise.then(() => {
        console.log('MathJax 已完成排版，正在应用拖拽功能。');
        
        // 找到所有渲染好的数学公式容器，并让它们可拖拽
        const formulaBlocks = document.querySelectorAll('mjx-container[display="true"]');
        formulaBlocks.forEach(makeDraggable);
      });
    }
  }
};

// 这是之前用来实现拖拽功能的函数
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  // 我们需要拖拽的是 mjx-container 的父元素 div，而不是 mjx-container 本身
  const parentWrapper = element.closest('div');
  if (!parentWrapper) return;
  
  parentWrapper.classList.add('draggable');
  parentWrapper.style.position = 'relative';

  parentWrapper.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - parentWrapper.offsetLeft;
    offsetY = e.clientY - parentWrapper.offsetTop;
    document.body.style.userSelect = 'none';
    parentWrapper.classList.add('dragging');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    parentWrapper.style.left = `${e.clientX - offsetX}px`;
    parentWrapper.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.userSelect = '';
    parentWrapper.classList.remove('dragging');
});
}