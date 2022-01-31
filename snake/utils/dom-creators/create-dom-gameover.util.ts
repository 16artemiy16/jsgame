const createDomGameover = (msg: string): HTMLDivElement => {
  const textDiv = document.createElement('div');

  textDiv.style.position = 'absolute';
  textDiv.style.top = '0';
  textDiv.style.left = '0';
  textDiv.style.bottom = '0';
  textDiv.style.right = '0';
  textDiv.style.display = 'flex';
  textDiv.style.alignItems = 'center';
  textDiv.style.justifyContent = 'center';
  textDiv.style.fontSize = '1.5em';
  textDiv.style.textAlign = 'center';
  textDiv.style.fontWeight = 'bold';
  textDiv.textContent = msg;

  return textDiv;
};

export default createDomGameover;
