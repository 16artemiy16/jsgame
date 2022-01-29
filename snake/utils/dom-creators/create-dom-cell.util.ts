const createDomCell = ({ id, cls, bg, size }: { id: string, cls: string, bg: string, size: number }): HTMLDivElement => {
  const cellEl = document.createElement('div') as HTMLDivElement;

  cellEl.style.width = `${size}px`;
  cellEl.style.height = `${size}px`;
  cellEl.style.border = '1px black solid';
  cellEl.style.background = bg;

  cellEl.id = id;
  cellEl.classList.add(cls);

  return cellEl;
};

export default createDomCell;
