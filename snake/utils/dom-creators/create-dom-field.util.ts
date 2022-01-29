const createDomField = (cls: string): HTMLDivElement => {
  const fieldDiv = document.createElement('div');

  fieldDiv.classList.add(cls)
  fieldDiv.style.display = 'flex';
  fieldDiv.style.flexDirection = 'column';
  fieldDiv.style.position = 'relative';

  return fieldDiv;
};

export default createDomField;
