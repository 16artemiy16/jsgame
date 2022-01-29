const createDomRow = (cls: string): HTMLDivElement => {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add(cls);
  rowDiv.style.display = 'flex';

  return rowDiv;
};

export default createDomRow;
